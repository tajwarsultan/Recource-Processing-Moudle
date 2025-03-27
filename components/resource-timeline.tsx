import { CalendarClock } from "lucide-react"

type TimelineItem = {
  date: string
  action: string
  user: string
}

type ResourceTimelineProps = {
  timeline: TimelineItem[]
}

export function ResourceTimeline({ timeline }: ResourceTimelineProps) {
  return (
    <div className="space-y-4">
      {timeline.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <CalendarClock className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{item.action}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{new Date(item.date).toLocaleString()}</span>
              <span>•</span>
              <span>{item.user}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

