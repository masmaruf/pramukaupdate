import siteSettings from "../content/settings/site.json";

export function normalizeWhatsAppNumber(value = siteSettings.whatsappNumber) {
  const digits = value.replace(/[^\d]/g, "");

  if (digits.startsWith("0")) {
    return `62${digits.slice(1)}`;
  }

  if (digits.startsWith("62")) {
    return digits;
  }

  return digits;
}

export function whatsappUrl(message = siteSettings.whatsappDefaultMessage) {
  const phone = normalizeWhatsAppNumber();
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const whatsappNumber = siteSettings.whatsappNumber;
