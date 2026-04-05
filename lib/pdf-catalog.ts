import jsPDF from "jspdf";
import type { Catalog, CompanySettings, Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

type CatalogProduct = Product & {
  categories?: {
    name?: string | null;
    color?: string | null;
  } | null;
};

type PdfInput = {
  catalog: Catalog | null;
  settings: CompanySettings | null;
  products: CatalogProduct[];
};

type PdfTheme = {
  primary: [number, number, number];
  accent: [number, number, number];
  muted: [number, number, number];
  border: [number, number, number];
  page: [number, number, number];
};

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 36;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const CARD_GAP = 16;
const CARD_WIDTH = (CONTENT_WIDTH - CARD_GAP) / 2;
const CARD_HEIGHT = 208;

function hexToRgb(hex: string | null | undefined, fallback: [number, number, number]): [number, number, number] {
  if (!hex) return fallback;
  const normalized = hex.replace("#", "").trim();
  if (!/^[0-9A-Fa-f]{6}$/.test(normalized)) return fallback;

  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16),
  ];
}

function buildTheme(settings: CompanySettings | null): PdfTheme {
  return {
    primary: hexToRgb(settings?.primary_color, [30, 58, 95]),
    accent: hexToRgb(settings?.accent_color, [15, 23, 42]),
    muted: [100, 116, 139],
    border: [226, 232, 240],
    page: [248, 250, 252],
  };
}

async function loadImageAsDataUrl(url: string | null | undefined): Promise<string | null> {
  if (!url) return null;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(typeof reader.result === "string" ? reader.result : null);
      reader.onerror = () => reject(new Error("Falha ao converter imagem."));
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function getImageFormat(dataUrl: string) {
  if (dataUrl.startsWith("data:image/png")) return "PNG";
  if (dataUrl.startsWith("data:image/webp")) return "WEBP";
  return "JPEG";
}

function groupProducts(products: CatalogProduct[]) {
  const map = new Map<string, { name: string; color: string; products: CatalogProduct[] }>();

  for (const product of products) {
    const key = product.categories?.name?.trim() || "Sem categoria";
    if (!map.has(key)) {
      map.set(key, {
        name: key,
        color: product.categories?.color || "#CBD5E1",
        products: [],
      });
    }
    map.get(key)?.products.push(product);
  }

  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}

function ensureSpace(pdf: jsPDF, currentY: number, requiredHeight: number, theme: PdfTheme, pageNumberRef: { value: number }) {
  if (currentY + requiredHeight <= PAGE_HEIGHT - MARGIN) return currentY;

  addPage(pdf, theme, pageNumberRef);
  return 64;
}

function addPage(pdf: jsPDF, theme: PdfTheme, pageNumberRef: { value: number }) {
  pdf.addPage();
  pageNumberRef.value += 1;
  drawPageBackground(pdf, theme);
}

function drawPageBackground(pdf: jsPDF, theme: PdfTheme) {
  pdf.setFillColor(...theme.page);
  pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, "F");
}

function drawHeader(pdf: jsPDF, theme: PdfTheme, settings: CompanySettings | null, catalog: Catalog | null, pageNumber: number) {
  pdf.setDrawColor(...theme.border);
  pdf.setLineWidth(1);
  pdf.line(MARGIN, 28, PAGE_WIDTH - MARGIN, 28);

  pdf.setTextColor(...theme.accent);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text(catalog?.pdf_title || settings?.company_name || "Catálogo", MARGIN, 18);

  pdf.setTextColor(...theme.muted);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text(`Página ${pageNumber}`, PAGE_WIDTH - MARGIN, 18, { align: "right" });
}

function drawFooter(pdf: jsPDF, theme: PdfTheme, settings: CompanySettings | null) {
  pdf.setDrawColor(...theme.border);
  pdf.setLineWidth(1);
  pdf.line(MARGIN, PAGE_HEIGHT - 28, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 28);

  pdf.setTextColor(...theme.muted);
  pdf.setFontSize(9);
  pdf.text(
    settings?.pdf_footer_text || "Documento gerado automaticamente pelo Catálogo React.",
    MARGIN,
    PAGE_HEIGHT - 14,
  );
}

function drawSectionTitle(pdf: jsPDF, text: string, y: number, theme: PdfTheme, color?: string | null) {
  const badgeColor = hexToRgb(color, theme.primary);
  pdf.setFillColor(...badgeColor);
  pdf.roundedRect(MARGIN, y - 12, 8, 28, 3, 3, "F");

  pdf.setTextColor(...theme.accent);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text(text, MARGIN + 18, y + 6);
}

function drawMetaBlock(pdf: jsPDF, x: number, y: number, label: string, value: string, theme: PdfTheme, width = 160) {
  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(...theme.border);
  pdf.roundedRect(x, y, width, 48, 10, 10, "FD");

  pdf.setTextColor(...theme.muted);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.text(label, x + 12, y + 16);

  pdf.setTextColor(...theme.accent);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text(value, x + 12, y + 34);
}

function drawProductCard(
  pdf: jsPDF,
  product: CatalogProduct,
  x: number,
  y: number,
  imageDataUrl: string | null,
  theme: PdfTheme,
) {
  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(...theme.border);
  pdf.roundedRect(x, y, CARD_WIDTH, CARD_HEIGHT, 14, 14, "FD");

  if (imageDataUrl) {
    try {
      pdf.addImage(imageDataUrl, getImageFormat(imageDataUrl), x + 12, y + 12, CARD_WIDTH - 24, 88, undefined, "MEDIUM");
    } catch {
      pdf.setFillColor(241, 245, 249);
      pdf.roundedRect(x + 12, y + 12, CARD_WIDTH - 24, 88, 10, 10, "F");
    }
  } else {
    pdf.setFillColor(241, 245, 249);
    pdf.roundedRect(x + 12, y + 12, CARD_WIDTH - 24, 88, 10, 10, "F");
    pdf.setTextColor(...theme.muted);
    pdf.setFontSize(10);
    pdf.text("Sem imagem", x + CARD_WIDTH / 2, y + 58, { align: "center" });
  }

  const chipColor = hexToRgb(product.categories?.color, [203, 213, 225]);
  pdf.setFillColor(...chipColor);
  pdf.roundedRect(x + 12, y + 112, 80, 18, 9, 9, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.text(product.categories?.name || "Sem categoria", x + 20, y + 124, {
    maxWidth: 64,
  });

  pdf.setTextColor(...theme.accent);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  const nameLines = pdf.splitTextToSize(product.name, CARD_WIDTH - 24);
  pdf.text(nameLines.slice(0, 2), x + 12, y + 148);

  const codeText = `Código: ${product.code || "—"}`;
  pdf.setTextColor(...theme.muted);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text(codeText, x + 12, y + 176);

  pdf.setTextColor(...theme.primary);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text(formatCurrency(product.price ?? 0), x + 12, y + 196);
}

export async function generateCatalogPdf({ catalog, settings, products }: PdfInput) {
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const theme = buildTheme(settings);
  const pageNumberRef = { value: 1 };
  const groupedProducts = groupProducts(products);
  const title = catalog?.pdf_title || settings?.company_name || "Catálogo de produtos";
  const subtitle =
    catalog?.pdf_subtitle ||
    settings?.pdf_footer_text ||
    "Catálogo completo de produtos com organização por categoria.";

  const [logoDataUrl, productImages] = await Promise.all([
    loadImageAsDataUrl(settings?.logo_url || catalog?.logo_url),
    Promise.all(
      products.map(async (product) => ({
        id: product.id,
        imageDataUrl: await loadImageAsDataUrl(product.image_url),
      })),
    ),
  ]);

  const imageMap = new Map(productImages.map((entry) => [entry.id, entry.imageDataUrl]));

  drawPageBackground(pdf, theme);
  drawHeader(pdf, theme, settings, catalog, pageNumberRef.value);
  drawFooter(pdf, theme, settings);

  const titleX = logoDataUrl ? MARGIN + 68 : MARGIN;
  if (logoDataUrl) {
    try {
      pdf.addImage(logoDataUrl, getImageFormat(logoDataUrl), MARGIN, 52, 52, 52, undefined, "MEDIUM");
    } catch {
      // ignore logo failure
    }
  }

  pdf.setTextColor(...theme.accent);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.text(title, titleX, 76, { maxWidth: 340 });

  pdf.setTextColor(...theme.muted);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.text(pdf.splitTextToSize(subtitle, 420), titleX, 96);

  const metaY = 132;
  drawMetaBlock(pdf, MARGIN, metaY, "Produtos", String(products.length), theme, 120);
  drawMetaBlock(pdf, MARGIN + 134, metaY, "Categorias", String(groupedProducts.length), theme, 120);
  drawMetaBlock(pdf, MARGIN + 268, metaY, "Empresa", settings?.company_name || "—", theme, 150);
  drawMetaBlock(pdf, MARGIN + 432, metaY, "Contato", settings?.phone || settings?.email || "—", theme, 126);

  pdf.setTextColor(...theme.accent);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.text("Informações da empresa", MARGIN, 244);

  pdf.setTextColor(...theme.muted);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  const companyLines = pdf.splitTextToSize(
    [
      settings?.legal_name,
      settings?.cnpj ? `CNPJ: ${settings.cnpj}` : null,
      settings?.website,
      settings?.address,
    ]
      .filter(Boolean)
      .join(" • ") || "Preencha mais dados da empresa para enriquecer o catálogo.",
    CONTENT_WIDTH,
  );
  pdf.text(companyLines, MARGIN, 264);

  let nextStartsOnNewPage = true;
  for (const [groupIndex, group] of groupedProducts.entries()) {
    if (groupIndex === 0 && companyLines.length <= 2) {
      nextStartsOnNewPage = false;
    }

    if (nextStartsOnNewPage) {
      addPage(pdf, theme, pageNumberRef);
      drawHeader(pdf, theme, settings, catalog, pageNumberRef.value);
      drawFooter(pdf, theme, settings);
    }

    let y = nextStartsOnNewPage ? 80 : 332;
    nextStartsOnNewPage = true;

    drawSectionTitle(pdf, group.name, y, theme, group.color);
    y += 28;

    pdf.setTextColor(...theme.muted);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text(`${group.products.length} produto(s) nesta categoria`, MARGIN + 18, y + 4);
    y += 24;

    for (let index = 0; index < group.products.length; index += 2) {
      y = ensureSpace(pdf, y, CARD_HEIGHT + 12, theme, pageNumberRef);
      if (y === 64) {
        drawHeader(pdf, theme, settings, catalog, pageNumberRef.value);
        drawFooter(pdf, theme, settings);
        drawSectionTitle(pdf, group.name, y, theme, group.color);
        y += 28;
      }

      const leftProduct = group.products[index];
      const rightProduct = group.products[index + 1];

      drawProductCard(pdf, leftProduct, MARGIN, y, imageMap.get(leftProduct.id) || null, theme);
      if (rightProduct) {
        drawProductCard(pdf, rightProduct, MARGIN + CARD_WIDTH + CARD_GAP, y, imageMap.get(rightProduct.id) || null, theme);
      }
      y += CARD_HEIGHT + 12;
    }
  }

  pdf.setProperties({
    title,
    subject: subtitle,
    author: settings?.company_name || "Catálogo React",
    creator: "Catálogo React",
    keywords: "catalogo, produtos, pdf, supabase, nextjs",
  });

  pdf.save(`${(settings?.company_name || "catalogo").toLowerCase().replace(/\s+/g, "-")}.pdf`);
}
