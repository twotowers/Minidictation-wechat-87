// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Avatar, AvatarFallback, AvatarImage, useToast } from '@/components/ui';
// @ts-ignore;
import { BookOpen, Plus, BarChart3, Users } from 'lucide-react';

export default function TeacherHomepage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0
  });
  const [recentAssignments, setRecentAssignments] = useState([]);

  // 模拟作业数据 - 只保留英语单词听写
  const mockAssignments = [{
    id: 4,
    title: '英语单词听写',
    subject: '英语',
    status: '进行中',
    students: 25,
    completed: 18,
    createdAt: '2025-09-06'
  }];

  // 模拟加载教师端数据
  useEffect(() => {
    loadTeacherData();
  }, []);
  const loadTeacherData = () => {
    setIsLoading(true);

    // 模拟API调用获取教师数据
    setTimeout(() => {
      setStats({
        totalStudents: 25
      });
      setRecentAssignments(mockAssignments);
      setIsLoading(false);
    }, 1000);
  };

  // 处理创建作业
  const handleCreateAssignment = () => {
    $w.utils.navigateTo({
      pageId: 'createAssignment',
      params: {}
    });
  };

  // 处理查看报告
  const handleViewReports = () => {
    $w.utils.navigateTo({
      pageId: 'reports',
      params: {}
    });
  };

  // 处理查看学生管理
  const handleViewStudents = () => {
    $w.utils.navigateTo({
      pageId: 'students',
      params: {}
    });
  };

  // 处理查看作业详情
  const handleViewAssignment = assignmentId => {
    $w.utils.navigateTo({
      pageId: 'assignmentDetail',
      params: {
        id: assignmentId
      }
    });
  };

  // 获取状态颜色
  const getStatusColor = status => {
    switch (status) {
      case '已完成':
        return 'bg-green-100 text-green-800';
      case '进行中':
        return 'bg-blue-100 text-blue-800';
      case '待批改':
        return 'bg-orange-100 text-orange-800';
      case '未开始':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 格式化日期
  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };
  if (isLoading) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在加载教师工作台...</p>
        </div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">教师工作台</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={$w.auth.currentUser?.avatarUrl} />
                <AvatarFallback>
                  {$w.auth.currentUser?.name?.charAt(0) || 'T'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 欢迎信息 */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            欢迎回来，{$w.auth.currentUser?.name || '老师'}！
          </h2>
          <p className="text-gray-600">今天是 {new Date().toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
          })}</p>
        </div>

        {/* 统计信息卡片 - 只保留学生总数 */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* 学生总数 */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">学生总数</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 快速操作区域 - 去掉批改作业 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>快速操作</CardTitle>
            <CardDescription>快速开始教学工作</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button onClick={handleCreateAssignment} className="h-20 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-8 h-8 mb-2" />
                <span>创建作业</span>
              </Button>

              <Button onClick={handleViewReports} className="h-20 flex flex-col items-center justify-center bg-green-600 hover:bg-green-700 text-white">
                <BarChart3 className="w-8 h-8 mb-2" />
                <span>查看报告</span>
              </Button>

              <Button onClick={handleViewStudents} className="h-20 flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700 text-white">
                <Users className="w-8 h-8 mb-2" />
                <span>学生管理</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 最近作业列表 - 只保留英语单词听写 */}
        <Card>
          <CardHeader>
            <CardTitle>最近作业</CardTitle>
            <CardDescription>最近的作业</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAssignments.map(assignment => <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => handleViewAssignment(assignment.id)}>
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(assignment.status)}`}>
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{assignment.title}</h4>
                      <p className="text-sm text-gray-600">{assignment.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(assignment.createdAt)}
                    </p>
                    <p className="text-xs text-gray-400">
                      完成: {assignment.completed}/{assignment.students}
                    </p>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* 底部操作栏 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between space-x-4">
              <Button variant="outline" onClick={() => $w.utils.navigateBack()} className="flex-1">
                返回首页
              </Button>
              <Button onClick={handleCreateAssignment} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                新建作业
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>;
}