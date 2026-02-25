import type { Event } from "@/lib/api";

interface EventListProps {
    events: Event[];
    total: number;
}

export default function EventList({ events, total }: EventListProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col h-full">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50">
                <h3 className="font-bold text-slate-900">Recent Events</h3>
                <span className="text-sm font-medium text-slate-500">{total} total</span>
            </div>

            {events.length === 0 ? (
                <div className="px-6 py-12 text-center text-slate-500 font-medium flex-1 flex items-center justify-center">
                    No events recorded yet.
                </div>
            ) : (
                <div className="divide-y divide-slate-100 overflow-y-auto max-h-96">
                    {events.map((event) => (
                        <div key={event.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <span
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${event.type === "CLICK"
                                        ? "bg-blue-50 text-blue-500"
                                        : "bg-emerald-50 text-emerald-500"
                                        }`}
                                >
                                    {event.type === "CLICK" ? "🖱️" : "✅"}
                                </span>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">
                                        {event.type === "CLICK" ? "Click Recorded" : "Conversion Recorded"}
                                    </p>
                                    {event.referenceId && (
                                        <p className="text-xs text-slate-500 font-mono mt-0.5">
                                            ref: {event.referenceId.slice(0, 12)}…
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-semibold text-slate-600">
                                    {new Date(event.createdAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </p>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    {new Date(event.createdAt).toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
