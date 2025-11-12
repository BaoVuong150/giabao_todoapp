import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

export default function TaskEmptyState({ filter }) {
  return (
    <div>
      <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
        <div className="space-y-3">
          <Circle className="mx-auto size-12 text-muted-foreground" />
          <div>
            <h3 className="font-md text-foreground">
              {filter === "active"
                ? "Không có nhiệm vụ nào đang làm."
                : filter === "completed"
                ? "Chưa có nhiệm vụ nào hoàn thành."
                : "Chưa có nhiệm vụ."}
            </h3>
            <p className="text-sm text-muted-foreground">
              {filter === "all"
                ? "Hãy thêm nhiệm vụ đầu tiên!"
                : `Chuyển sang tất cả để xem nhiệm vụ ${
                    filter === "active" ? "đã hoàn thành" : "đang làm"
                  }`}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
