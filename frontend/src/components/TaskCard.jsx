import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import api from "@/lib/axios";
import { useState } from "react";

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Nhiệm vụ đã xoá.");
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi xảy ra khi xoá task", error);
      toast.error("Lỗi xảy ra khi thêm nhiệm vụ mới");
    }
  };

  const updateTask = async () => {
    try {
      setIsEditting(false);
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle,
      });
      toast.success(`Nhiệm vụ đã đổi thành ${updateTaskTitle}.`);
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi xảy ra khi chỉnh sửa task", error);
      toast.error("Lỗi xảy ra khi sửa task");
    }
  };

  const toggleTaskCompleteButton = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "completed",
          completedAt: new Date().toISOString(),
        });
        toast.success(`${task.title} đã hoàn thành`);
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.success(`${task.title} đã đổi sang trạng thái chưa hoàn thành.`)
      }
      await handleTaskChanged()
    } catch (error) {
      console.error("Lỗi xảy ra khi hoàn thành task", error);
      toast.error("Lỗi xảy ra khi hoàn thành task");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      updateTask();
    }
  };

  return (
    <div>
      <Card
        className={cn(
          "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fate-in group",
          task.status === "completed" && "opacity-75"
        )}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex items-center gap-4">
          {/* Nút tròn */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "flex-skrink-0 size-8 rounded-full transition-all duration-200",
              task.status === "completed"
                ? "text-success hover:text-success/80"
                : "text-muted-foreground hover:text-primary"
            )}
            onClick={toggleTaskCompleteButton}
          >
            {task.status === "completed" ? (
              <CheckCircle2 className="size-5" />
            ) : (
              <Circle className="size-5" />
            )}
          </Button>

          {/* Phần hiển thị title của task */}
          <div className="flex-1 min-w-0">
            {isEditting ? (
              <Input
                placeholder="Cần phải làm gì?"
                className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                type="text"
                value={updateTaskTitle}
                onChange={(e) => setUpdateTaskTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                onBlur={() => {
                  setIsEditting(false);
                  setUpdateTaskTitle(task.title || "");
                }}
              />
            ) : (
              <p
                className={cn(
                  "text-base transition-all duration-200",
                  task.status === "completed"
                    ? "line-through text-muted-foreground"
                    : "text-muted-foreground"
                )}
              >
                {task.title}
              </p>
            )}
            {/* Ngày tạo và ngày hoàn thành */}
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="size-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {new Date(task.createdAt).toLocaleString()}
              </span>
              {task.completedAt && (
                <>
                  <span className="text-xs text-muted-foreground"> - </span>
                  <Calendar className="size-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {new Date(task.completedAt).toLocaleString()}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Nút chỉnh và nút xoá */}
          <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
            {/* Nút edit */}
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
              onClick={() => {
                setIsEditting(true);
                setUpdateTaskTitle(task.title || "");
              }}
            >
              <SquarePen className="size-4" />
            </Button>
            {/* Nút delete */}
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
              onClick={() => deleteTask(task._id)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskCard;
