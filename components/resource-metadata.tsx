import { Badge } from "@/components/ui/badge"

type ResourceMetadataProps = {
  metadata: Record<string, any>
}

export function ResourceMetadata({ metadata }: ResourceMetadataProps) {
  return (
    <div className="space-y-4">
      {Object.entries(metadata).map(([key, value]) => (
        <div key={key} className="space-y-1">
          <p className="text-sm font-medium capitalize">{key}</p>
          {Array.isArray(value) ? (
            <div className="flex flex-wrap gap-2">
              {value.map((item, index) => (
                <Badge key={index} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {typeof value === "object" ? JSON.stringify(value) : value.toString()}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

