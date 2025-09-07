// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Avatar, AvatarFallback, AvatarImage, useToast, Alert, AlertDescription, AlertTitle } from '@/components/ui';
// @ts-ignore;
import { BookOpen, Play, Calendar, CheckCircle, Clock, AlertCircle, Bell, ChevronRight, Eye, EyeOff } from 'lucide-react';

export default function ParentHomepage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [urgentAssignments, setUrgentAssignments] = useState(0);
  const [showAllAssignments, setShowAllAssignments] = useState(false);

  // 模拟作业数据加载 - 与教师平台保持一致，只保留英语单词听写
  useEffect(() => {
    loadAssignments();
  }, []);
  const loadAssignments = () => {
    setIsLoading(true);

    // 模拟API调用获取作业数据 - 与教师平台保持一致
    setTimeout(() => {
      const mockAssignments = [{
        id: 4,
        title: '英语单词',
        subject: '英语',
        date: '2025-09-06',
        wordCount: 20,
        status: '进行中',
        progress: 18,
        dueDate: '2025-09-07',
        badgeVariant: 'default',
        textbook: '人教版英语三年级上册',
        unit: 'Unit 1: Hello!',
        isNew: true,
        isUrgent: true,
        teacher: '张老师',
        students: 25,
        completed: 18,
        createdAt: '2025-09-06'
      }];
      setAssignments(mockAssignments);

      // 计算未读作业数量
      const newUnreadCount = mockAssignments.filter(assignment => assignment.isNew).length;
      setUnreadCount(newUnreadCount);

      // 计算紧急作业数量（今天或明天到期）
      const newUrgentCount = mockAssignments.filter(assignment => assignment.isUrgent).length;
      setUrgentAssignments(newUrgentCount);
      setIsLoading(false);

      // 移除欢迎提示，避免打扰用户
    }, 1000);
  };

  // 处理开始听写按钮点击
  const handleStartDictation = assignmentId => {
    // 标记该作业为已读
    const updatedAssignments = assignments.map(assignment => assignment.id === assignmentId ? {
      ...assignment,
      isNew: false
    } : assignment);
    setAssignments(updatedAssignments);
    setUnreadCount(prev => prev - 1);
    $w.utils.navigateTo({
      pageId: 'dictation',
      params: {
        assignmentId
      }
    });
  };

  // 标记所有作业为已读
  const markAllAsRead = () => {
    const updatedAssignments = assignments.map(assignment => ({
      ...assignment,
      isNew: false
    }));
    setAssignments(updatedAssignments);
    setUnreadCount(0);
    // 移除成功提示，避免打扰用户
  };

  // 获取状态对应的颜色
  const getStatusColor = status => {
    switch (status) {
      case '未开始':
        return 'text-gray-600 bg-gray-100';
      case '进行中':
        return 'text-blue-600 bg-blue-100';
      case '已完成':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // 获取状态图标
  const getStatusIcon = status => {
    switch (status) {
      case '未开始':
        return <Clock className="w-4 h-4" />;
      case '进行中':
        return <AlertCircle className="w-4 h-4" />;
      case '已完成':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // 过滤显示的作业
  const displayedAssignments = showAllAssignments ? assignments : assignments.filter(assignment => assignment.isNew || assignment.isUrgent);
  if (isLoading) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在加载作业列表...</p>
        </div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">家长工作台</h1>
            </div>
            <div className="flex items-center space-x-4">
              {unreadCount > 0 && <div className="relative">
                  <Badge className="bg-red-500 text-white animate-pulse">
                    {unreadCount}
                  </Badge>
                  <div className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </div>
                </div>}
              <Avatar className="h-8 w-8">
                <AvatarImage src={$w.auth.currentUser?.avatarUrl} />
                <AvatarFallback>
                  {$w.auth.currentUser?.name?.charAt(0) || 'P'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 新作业提醒 - 更加醒目的设计 */}
        {unreadCount > 0 && <div className="mb-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-full">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-white">
                  <h3 className="text-lg font-semibold">新作业提醒！</h3>
                  <p className="text-blue-100">
                    您有 {unreadCount} 个新作业需要处理
                    {urgentAssignments > 0 && `，其中 ${urgentAssignments} 个作业即将到期`}
                  </p>
                </div>
              </div>
              <Button onClick={markAllAsRead} className="bg-white text-blue-600 hover:bg-blue-50 border-0 font-medium">
                <EyeOff className="w-4 h-4 mr-2" />
                标记全部为已读
              </Button>
            </div>
          </div>}

        {/* 页面标题和操作区 */}
        <div className="mb-6 flex flex-col sm:flex-row sm:flex-row sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">作业列表</h2>
            <p className="text-gray-600">请选择要开始的听写作业</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {unreadCount > 0 && <Badge variant="outline" className="bg-red-100 text-red-800 animate-bounce">
                <Bell className="w-3 h-3 mr-1" />
                {unreadCount} 个新作业
              </Badge>}
            
            <Button variant="outline" size="sm" onClick={() => setShowAllAssignments(!showAllAssignments)} className="flex items-center">
              {showAllAssignments ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showAllAssignments ? '只看新作业' : '显示所有作业'}
            </Button>
          </div>
        </div>

        {/* 作业列表 */}
        <div className="space-y-4">
          {displayedAssignments.length > 0 ? displayedAssignments.map(assignment => <Card key={assignment.id} className={`hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${assignment.isNew ? 'border-2 border-blue-300 bg-blue-50' : assignment.isUrgent ? 'border-2 border-yellow-300 bg-yellow-50' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* 作业标题和状态 */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {assignment.title}
                      </h3>
                      {assignment.isNew && <Badge className="bg-red-100 text-red-800 animate-pulse">
                          <Bell className="w-3 h-3 mr-1" />
                          新作业
                        </Badge>}
                      {assignment.isUrgent && <Badge className="bg-yellow-100 text-yellow-800">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          即将到期
                        </Badge>}
                      <Badge variant={assignment.badgeVariant} className={getStatusColor(assignment.status)}>
                        <span className="flex items-center">
                          {getStatusIcon(assignment.status)}
                          <span className="ml-1">{assignment.status}</span>
                        </span>
                      </Badge>
                    </div>
                    
                    {/* 教师信息 */}
                    <div className="mb-3">
                      <span className="text-sm text-gray-500">布置老师: {assignment.teacher}</span>
                    </div>
                    
                    {/* 教材单元信息 */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          📚 {assignment.textbook}
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          📖 {assignment.unit}
                        </span>
                      </div>
                    </div>
                    
                    {/* 作业详情信息 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                        <span>布置: {assignment.date}</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-green-500" />
                        <span>单词: {assignment.wordCount}个</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-orange-500" />
                        <span className={assignment.isUrgent ? 'text-red-600 font-medium' : ''}>
                          截止: {assignment.dueDate}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span>进度: {assignment.progress}/{assignment.wordCount}</span>
                      </div>
                    </div>

                    {/* 进度条 */}
                    {assignment.status !== '未开始' && <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>完成进度</span>
                          <span>{Math.round(assignment.progress / assignment.wordCount * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{
                      width: `${assignment.progress / assignment.wordCount * 100}%`
                    }} />
                        </div>
                      </div>}
                  </div>

                  <div className="ml-6 flex flex-col space-y-2">
                    <Button onClick={() => handleStartDictation(assignment.id)} disabled={assignment.status === '已完成'} className="min-w-[120px] bg-blue-600 hover:bg-blue-700">
                      <Play className="w-4 h-4 mr-2" />
                      {assignment.status === '已完成' ? '已完成' : '开始听写'}
                    </Button>
                    
                    {assignment.isNew && <Button variant="outline" size="sm" onClick={() => {
                  const updatedAssignments = assignments.map(a => a.id === assignment.id ? {
                    ...a,
                    isNew: false
                  } : a);
                  setAssignments(updatedAssignments);
                  setUnreadCount(prev => prev - 1);
                }} className="text-gray-600">
                        <EyeOff className="w-3 h-3 mr-1" />
                        标记已读
                      </Button>}
                  </div>
                </div>
              </CardContent>
            </Card>) : <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {showAllAssignments ? '暂无作业' : '暂无新作业'}
                </h3>
                <p className="text-gray-600">
                  {showAllAssignments ? '当前没有需要完成的听写作业' : '当前没有新的听写作业'}
                </p>
                {!showAllAssignments && assignments.length > 0 && <Button variant="outline" className="mt-4" onClick={() => setShowAllAssignments(true)}>
                    <Eye className="w-4 h-4 mr-2" />
                    查看所有作业
                  </Button>}
              </CardContent>
            </Card>}
        </div>

        {/* 底部统计信息 */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{assignments.length}</div>
              <div className="text-sm text-gray-600">总作业</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
              <div className="text-sm text-gray-600">未读作业</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{urgentAssignments}</div>
              <div className="text-sm text-gray-600">紧急作业</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {assignments.filter(a => a.status === '已完成').length}
              </div>
              <div className="text-sm text-gray-600">已完成</div>
            </div>
          </div>
        </div>
      </main>
    </div>;
}