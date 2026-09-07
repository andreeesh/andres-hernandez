export function MetadataChips({ value, className = "" }: { value: string; className?: string }) {
  return <div className={`metadata-chips ${className}`.trim()}>{value.split("·").map((item) => item.trim()).filter(Boolean).map((item) => <span className="metadata-chip" key={item}>{item}</span>)}</div>;
}
