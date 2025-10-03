import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Avatar from "@/components/atoms/Avatar";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import teamMemberService from "@/services/api/teamMemberService";
import taskService from "@/services/api/taskService";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setError("");
      setLoading(true);
      const [membersData, tasksData] = await Promise.all([
        teamMemberService.getAll(),
        taskService.getAll()
      ]);
      setTeamMembers(membersData);
      setTasks(tasksData);
    } catch (err) {
      setError(err.message || "Failed to load team data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;
  if (teamMembers.length === 0) {
    return (
      <Empty 
        icon="Users"
        title="No team members yet"
        description="Add team members to start collaborating on projects"
      />
    );
  }

  const getMemberTasks = (memberId) => {
    return tasks.filter(task => task.assigneeId === memberId);
  };

  const getMemberStats = (memberId) => {
    const memberTasks = getMemberTasks(memberId);
    const completed = memberTasks.filter(task => {
      const column = task.columnId;
      return column === 4 || column === 8 || column === 11 || column === 14;
    }).length;
    const inProgress = memberTasks.filter(task => {
      const column = task.columnId;
      return column === 2 || column === 6 || column === 10 || column === 13;
    }).length;
    const todo = memberTasks.length - completed - inProgress;

    return { total: memberTasks.length, completed, inProgress, todo };
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Members</h1>
        <p className="text-gray-600">
          View team members and their current workload
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => {
          const stats = getMemberStats(member.Id);
          const workloadPercentage = stats.total > 0 ? (stats.inProgress / stats.total) * 100 : 0;

          return (
            <motion.div
              key={member.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <Avatar 
                    src={member.avatar} 
                    alt={member.name}
                    size="lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{member.role}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Workload</span>
                      <span className="font-medium text-gray-900">
                        {stats.inProgress}/{stats.total} tasks
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
                        style={{ width: `${workloadPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">To Do</div>
                      <div className="text-lg font-semibold text-blue-600">
                        {stats.todo}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">In Progress</div>
                      <div className="text-lg font-semibold text-amber-600">
                        {stats.inProgress}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Done</div>
                      <div className="text-lg font-semibold text-green-600">
                        {stats.completed}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Team;