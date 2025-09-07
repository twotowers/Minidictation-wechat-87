// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
// @ts-ignore;
import { BookOpen, BarChart3, Calendar, CheckCircle, Clock, FileText, User, Users, School } from 'lucide-react';

export default function Homepage(props) {
  const {
    $w,
    style
  } = props;

  // 处理进入教师端
  const handleEnterTeacher = () => {
    $w.utils.navigateTo({
      pageId: 'teacherHome',
      params: {}
    });
  };

  // 处理进入家长端
  const handleEnterParent = () => {
    $w.utils.navigateTo({
      pageId: 'parentHome',
      params: {}
    });
  };

  // 根据用户类型自动跳转（可选功能）
  const autoRedirectByUserType = () => {
    const userType = $w.auth.currentUser?.type;
    if (userType === 'teacher') {
      handleEnterTeacher();
    } else if (userType === 'parent') {
      handleEnterParent();
    }
    // 如果没有用户类型信息，停留在选择页面
  };

  // 组件挂载时尝试自动跳转
  React.useEffect(() => {
    autoRedirectByUserType();
  }, []);
  return <div style={style} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <School className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">智能听写系统</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={$w.auth.currentUser?.avatarUrl} />
                <AvatarFallback>
                  {$w.auth.currentUser?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 欢迎信息 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            欢迎使用智能听写系统
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            专业的在线听写平台，为教师和家长提供便捷的作业管理体验
          </p>
        </div>

        {/* 身份选择卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 教师端入口 */}
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  教师工作台
                </h3>
                <p className="text-gray-600 mb-6">
                  布置作业、批改作业、查看学生学习报告
                </p>
                <div className="space-y-3 text-sm text-gray-500 text-left mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>创建听写作业</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>批改学生作业</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>查看学习报告</span>
                  </div>
                </div>
                <Button onClick={handleEnterTeacher} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  <BookOpen className="w-5 h-5 mr-2" />
                  进入教师端
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 家长端入口 */}
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  家长工作台
                </h3>
                <p className="text-gray-600 mb-6">
                  查看作业、协助听写、跟踪学习进度
                </p>
                <div className="space-y-3 text-sm text-gray-500 text-left mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>查看作业列表</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>协助孩子听写</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>跟踪学习进度</span>
                  </div>
                </div>
                <Button onClick={handleEnterParent} className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  <BookOpen className="w-5 h-5 mr-2" />
                  进入家长端
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 底部说明 */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            根据您的身份选择相应的工作台。系统会根据您的账户类型自动推荐合适的入口。
          </p>
        </div>
      </main>
    </div>;
}