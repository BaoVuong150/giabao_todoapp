import React from "react";

const Footer = ({ completedTaskCount = 0, activeTaskCount = 0 }) => {
  return (
    <>
      {completedTaskCount + activeTaskCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-blue-600">
            {completedTaskCount > 0 && (
              <>
                &lt;&gt;Bạn đã hoàn thành tổng cộng {completedTaskCount} công việc
                {activeTaskCount > 0 &&
                  `, còn ${activeTaskCount} việc nữa thôi`}&lt;/&gt;
              </>
            )}
            {completedTaskCount === 0 && activeTaskCount > 0 && (
              <>&lt;&gt;Hãy bắt đầu làm {activeTaskCount} nhiệm vụ nào!&lt;/&gt;</>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
