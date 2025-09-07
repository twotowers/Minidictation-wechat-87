// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { BarChart3, Download, RefreshCw, TrendingUp, Users, CheckCircle, AlertTriangle } from 'lucide-react';

// @ts-ignore;
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function ReportsPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [stats, setStats] = useState({
    submissionRate: 0,
    completionRate: 0,
    averageAccuracy: 0,
    totalStudents: 0,
    submittedStudents: 0
  });
  const [classAccuracy, setClassAccuracy] = useState([]);
  const [errorWords, setErrorWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 模拟数据加载
  useEffect(() => {
    loadReportData();
  }, []);
  const loadReportData = () => {
    setIsLoading(true);

    // 模拟API调用获取数据
    setTimeout(() => {
      // 模拟统计数据
      const mockStats = {
        submissionRate: 85.7,
        completionRate: 92.3,
        averageAccuracy: 78.5,
        totalStudents: 45,
        submittedStudents: 39
      };

      // 模拟班级正确率数据
      const mockClassAccuracy = [{
        className: '三年级一班',
        accuracy: 82.4,
        students: 15
      }, {
        className: '三年级二班',
        accuracy: 76.8,
        students: 14
      }, {
        className: '三年级三班',
        accuracy: 85.2,
        students: 16
      }, {
        className: '四年级一班',
        accuracy: 71.3,
        students: 12
      }, {
        className: '四年级二班',
        accuracy: 79.6,
        students: 13
      }];

      // 模拟错词排行榜
      const mockErrorWords = [{
        word: 'restaurant',
        errorCount: 28,
        accuracy: 62.1
      }, {
        word: 'beautiful',
        errorCount: 25,
        accuracy: 65.4
      }, {
        word: 'government',
        errorCount: 22,
        accuracy: 68.9
      }, {
        word: 'environment',
        errorCount: 19,
        accuracy: 72.3
      }, {
        word: 'temperature',
        errorCount: 17,
        accuracy: 75.6
      }, {
        word: 'opportunity',
        errorCount: 15,
        accuracy: 78.2
      }, {
        word: 'communication',
        errorCount: 13,
        accuracy: 80.5
      }, {
        word: 'information',
        errorCount: 11,
        accuracy: 83.7
      }, {
        word: 'development',
        errorCount: 9,
        accuracy: 86.2
      }, {
        word: 'international',
        errorCount: 7,
        accuracy: 89.4
      }];
      setStats(mockStats);
      setClassAccuracy(mockClassAccuracy);
      setErrorWords(mockErrorWords);
      setIsLoading(false);
      toast({
        title: "数据加载成功",
        description: "报告数据已更新"
      });
    }, 1000);
  };
  const handleExportReport = () => {
    // 模拟导出报告
    toast({
      title: "报告导出中",
      description: "正在生成PDF报告..."
    });
    setTimeout(() => {
      toast({
        title: "导出成功",
        description: "报告已成功导出为PDF文件"
      });
    }, 2000);
  };
  const handleRefresh = () => {
    loadReportData();
  };
  const handleBack = () => {
    $w.utils.navigateBack();
  };
  if (isLoading) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">正在加载报告数据...</p>
        </div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={handleBack} className="mr-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
              <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">作业报告分析</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleRefresh} size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                刷新
              </Button>
              <Button onClick={handleExportReport} size="sm">
                <Download className="w-4 h-4 mr-2" />
                导出报告
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 统计卡片区 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-white/20 p-3 mr-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-blue-100">提交率</p>
                  <p className="text-2xl font-bold">{stats.submissionRate}%</p>
                  <p className="text-xs text-blue-200">
                    {stats.submittedStudents}/{stats.totalStudents} 人已提交
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-white/20 p-3 mr-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-green-100">完成率</p>
                  <p className="text-2xl font-bold">{stats.completionRate}%</p>
                  <p className="text-xs text-green-200">作业完成比例</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-white/20 p-3 mr-4">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-purple-100">平均正确率</p>
                  <p className="text-2xl font-bold">{stats.averageAccuracy}%</p>
                  <p className="text-xs text-purple-200">整体正确率</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-white/20 p-3 mr-4">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-orange-100">总学生数</p>
                  <p className="text-2xl font-bold">{stats.totalStudents}</p>
                  <p className="text-xs text-orange-200">参与学生总数</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-white/20 p-3 mr-4">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-red-100">未提交</p>
                  <p className="text-2xl font-bold">{stats.totalStudents - stats.submittedStudents}</p>
                  <p className="text-xs text-red-200">待完成学生数</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 班级正确率图表 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>班级正确率对比</CardTitle>
            <CardDescription>各班级作业正确率统计分析</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classAccuracy}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="className" angle={-45} textAnchor="end" height={80} tick={{
                  fontSize: 12
                }} />
                  <YAxis domain={[0, 100]} tickFormatter={value => `${value}%`} />
                  <Tooltip formatter={value => [`${value}%`, '正确率']} labelFormatter={(value, payload) => {
                  if (payload && payload[0]) {
                    return `${value} (${payload[0].payload.students}人)`;
                  }
                  return value;
                }} />
                  <Legend />
                  <Bar dataKey="accuracy" name="正确率" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 错词排行榜 */}
        <Card>
          <CardHeader>
            <CardTitle>错词排行榜</CardTitle>
            <CardDescription>学生最容易出错的单词统计</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">排名</TableHead>
                    <TableHead>单词</TableHead>
                    <TableHead>错误次数</TableHead>
                    <TableHead>正确率</TableHead>
                    <TableHead className="w-20">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {errorWords.map((word, index) => <TableRow key={word.word}>
                      <TableCell>
                        <Badge variant={index < 3 ? "default" : "secondary"}>
                          {index + 1}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{word.word}</TableCell>
                      <TableCell>{word.errorCount} 次</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{
                          width: `${word.accuracy}%`
                        }} />
                          </div>
                          <span className="text-sm">{word.accuracy}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          详情
                        </Button>
                      </TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>;
}