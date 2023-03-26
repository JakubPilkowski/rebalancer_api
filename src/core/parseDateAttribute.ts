export default function parseDateAttribute(attribute: string | NativeDate): string {
  return new Date(attribute).toISOString();
}
