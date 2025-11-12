import AddTask from "@/components/AddTask";
import DateTimeFilters from "@/components/DateTimeFilters";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAddFilters from "@/components/StatsAddFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimited } from "@/lib/data";

const HomePage = () => {
  const [taskBuffer, settaskBuffer] = useState([]);
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completeTasksCount, setCompleteTasksCount] = useState(0);
  const [filter, setFilter] = useState(0);
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  
  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  //logic
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      settaskBuffer(res.data.tasks);
      setActiveTasksCount(res.data.activeCount);
      setCompleteTasksCount(res.data.completeCount);
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất tasks", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks");
    }
  };

  const handleTaskChanged = () => {
    fetchTasks();
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //variable
  const filteredTasks = taskBuffer.filter((tasks) => {
    switch (filter) {
      case "active":
        return tasks.status === "active";
      case "completed":
        return tasks.status === "completed";
      default:
        return true;
    }
  });

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimited,
    page * visibleTaskLimited
  );

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimited);
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
 {/* Purple Corner Grid Background */}
 <div
   className="absolute inset-0 z-0"
   style={{
     backgroundImage: `
       linear-gradient(to right, #f0f0f0 1px, transparent 1px),
       linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
       radial-gradient(circle 600px at 0% 200px, #d5c5ff, transparent),
       radial-gradient(circle 600px at 100% 200px, #d5c5ff, transparent)
     `,
      backgroundSize: "20px 20px, 20px 20px, 100% 100%, 100% 100%",
   }}
 />
 {/* Your Content Here */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Đầu trang */}
          <Header />

          {/* Tạo task */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />

          {/* Thống kê */}
          <StatsAddFilters
            filter={filter}
            setFilter={setFilter}
            completedTaskCount={completeTasksCount}
            activeTaskCount={activeTasksCount}
          />

          {/* Danh sách nhiệm vụ */}
          <TaskList
            TaskFilters={visibleTasks}
            filters={filter}
            handleTaskChanged={handleTaskChanged}
          />

          {/* Phân trang và lọc */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination 
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilters
              dateQuery={dateQuery}
              setDateQuery={setDateQuery}
            />
          </div>

          {/* Chân trang */}
          <Footer
            completedTaskCount={completeTasksCount}
            activeTaskCount={activeTasksCount}
          />
        </div>
      </div>
</div>
  );
};

export default HomePage;
