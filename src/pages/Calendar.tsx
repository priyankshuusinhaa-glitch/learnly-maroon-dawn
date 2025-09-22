import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as BigCalendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { Plus, Calendar as CalendarIcon, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup localizer
const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resource: {
    type: "study" | "meeting" | "deadline";
    goal: string;
    notes?: string;
  };
}

const Calendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: "React Hooks Study Session",
      start: new Date(2024, 11, 22, 14, 0),
      end: new Date(2024, 11, 22, 16, 0),
      resource: {
        type: "study",
        goal: "Master React Hooks",
        notes: "Focus on useEffect and custom hooks"
      }
    },
    {
      id: 2,
      title: "TypeScript Project Deadline",
      start: new Date(2024, 11, 25, 9, 0),
      end: new Date(2024, 11, 25, 17, 0),
      resource: {
        type: "deadline",
        goal: "Complete TypeScript Course"
      }
    },
    {
      id: 3,
      title: "Docker Learning Session",
      start: new Date(2024, 11, 23, 19, 0),
      end: new Date(2024, 11, 23, 21, 30),
      resource: {
        type: "study",
        goal: "Learn Docker Basics",
        notes: "Docker compose and containerization"
      }
    },
    {
      id: 4,
      title: "Portfolio Review Meeting",
      start: new Date(2024, 11, 24, 15, 0),
      end: new Date(2024, 11, 24, 16, 0),
      resource: {
        type: "meeting",
        goal: "Build Portfolio Website"
      }
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    type: "study" as "study" | "meeting" | "deadline",
    goal: "",
    notes: ""
  });

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewEventOpen, setIsNewEventOpen] = useState(false);

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = "#800000"; // Default maroon
    
    switch (event.resource.type) {
      case "study":
        backgroundColor = "#800000";
        break;
      case "meeting":
        backgroundColor = "#a00000";
        break;
      case "deadline":
        backgroundColor = "#600000";
        break;
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "8px",
        opacity: 0.9,
        color: "white",
        border: "none",
        fontSize: "12px",
      }
    };
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) return;

    const event: CalendarEvent = {
      id: Date.now(),
      title: newEvent.title,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
      resource: {
        type: newEvent.type,
        goal: newEvent.goal,
        notes: newEvent.notes
      }
    };

    setEvents([...events, event]);
    setNewEvent({ title: "", start: "", end: "", type: "study", goal: "", notes: "" });
    setIsNewEventOpen(false);
  };

  const customComponents = {
    toolbar: ({ label, onNavigate, onView }: any) => (
      <div className="flex items-center justify-between mb-6 p-4 glass-card">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => onNavigate("PREV")}
            className="btn-ghost-maroon"
          >
            ←
          </Button>
          <h2 className="text-xl font-semibold text-foreground">{label}</h2>
          <Button
            variant="outline"
            onClick={() => onNavigate("NEXT")}
            className="btn-ghost-maroon"
          >
            →
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onView(Views.MONTH)}
            className="btn-ghost-maroon"
          >
            Month
          </Button>
          <Button
            variant="outline"
            onClick={() => onView(Views.WEEK)}
            className="btn-ghost-maroon"
          >
            Week
          </Button>
          <Button
            variant="outline"
            onClick={() => onView(Views.DAY)}
            className="btn-ghost-maroon"
          >
            Day
          </Button>
        </div>
      </div>
    ),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Learning Calendar</h1>
          <p className="text-muted-foreground">Schedule and track your learning sessions</p>
        </div>
        
        <Dialog open={isNewEventOpen} onOpenChange={setIsNewEventOpen}>
          <DialogTrigger asChild>
            <Button className="btn-maroon">
              <Plus className="h-4 w-4 mr-2" />
              Add Session
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Schedule Learning Session</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Session Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., React Hooks Study"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="input-glass"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start">Start Time</Label>
                  <Input
                    id="start"
                    type="datetime-local"
                    value={newEvent.start}
                    onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                    className="input-glass"
                  />
                </div>
                <div>
                  <Label htmlFor="end">End Time</Label>
                  <Input
                    id="end"
                    type="datetime-local"
                    value={newEvent.end}
                    onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                    className="input-glass"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="type">Session Type</Label>
                <Select onValueChange={(value: "study" | "meeting" | "deadline") => setNewEvent({ ...newEvent, type: value })}>
                  <SelectTrigger className="input-glass">
                    <SelectValue placeholder="Select session type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="study">Study Session</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="goal">Related Goal</Label>
                <Input
                  id="goal"
                  placeholder="Which goal is this for?"
                  value={newEvent.goal}
                  onChange={(e) => setNewEvent({ ...newEvent, goal: e.target.value })}
                  className="input-glass"
                />
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Session details or objectives"
                  value={newEvent.notes}
                  onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                  className="input-glass resize-none"
                />
              </div>

              <Button onClick={addEvent} className="w-full btn-maroon">
                Schedule Session
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <div style={{ height: "600px" }}>
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
            components={customComponents}
            style={{
              color: "hsl(var(--foreground))",
            }}
          />
        </div>
      </motion.div>

      {/* Event Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass-card border-border">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-foreground flex items-center gap-2">
                  {selectedEvent.resource.type === "study" && <BookOpen className="h-5 w-5 text-primary" />}
                  {selectedEvent.resource.type === "meeting" && <CalendarIcon className="h-5 w-5 text-primary" />}
                  {selectedEvent.resource.type === "deadline" && <Clock className="h-5 w-5 text-primary" />}
                  {selectedEvent.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Time</Label>
                  <p className="text-foreground">
                    {moment(selectedEvent.start).format("MMMM Do, YYYY [at] h:mm A")} - {moment(selectedEvent.end).format("h:mm A")}
                  </p>
                </div>
                
                <div>
                  <Label className="text-muted-foreground">Type</Label>
                  <p className="text-foreground capitalize">{selectedEvent.resource.type}</p>
                </div>
                
                <div>
                  <Label className="text-muted-foreground">Related Goal</Label>
                  <p className="text-foreground">{selectedEvent.resource.goal}</p>
                </div>
                
                {selectedEvent.resource.notes && (
                  <div>
                    <Label className="text-muted-foreground">Notes</Label>
                    <p className="text-foreground">{selectedEvent.resource.notes}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;