// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge, Progress, useToast } from '@/components/ui';
// @ts-ignore;
import { CheckCircle, XCircle, Send, RotateCcw, BookOpen, AlertCircle } from 'lucide-react';

export default function ReviewPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [words, setWords] = useState([]);
  const [errorCount, setErrorCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [assignment, setAssignment] = useState(null);

  // 模拟单词数据
  const mockWords = [{
    id: 1,
    word: 'apple',
    meaning: '苹果',
    pronunciation: '/ˈæp.əl/',
    isCorrect: null
  }, {
    id: 2,
    word: 'banana',
    meaning: '香蕉',
    pronunciation: '/bəˈnæn.ə/',
    isCorrect: null
  }, {
    id: 3,
    word: 'orange',
    meaning: '橙子',
    pronunciation: '/ˈɒr.ɪndʒ/',
    isCorrect: null
  }, {
    id: 4,
    word: 'grape',
    meaning: '葡萄',
    pronunciation: '/ɡreɪp/',
    isCorrect: null
  }, {
    id: 5,
    word: 'watermelon',
    meaning: '西瓜',
    pronunciation: '/ˈwɔː.təˌmel.ən/',
    isCorrect: null
  }, {
    id: 6,
    word: 'strawberry',
    meaning: '草莓',
    pronunciation: '/ˈstrɔː.bər.i/',
    isCorrect: null
  }, {
    id: 7,
    word: 'pineapple',
    meaning: '菠萝',
    pronunciation: '/ˈpaɪn.æp.əl/',
    isCorrect: null
  }, {
    id: 8,
    word: 'mango',
    meaning: '芒果',
    pronunciation: '/ˈmæŋ.ɡəʊ/',
    isCorrect: null
  }, {
    id: 9,
    word: 'peach',
    meaning: '桃子',
    pronunciation: '/piːtʃ/',
    isCorrect: null
  }, {
    id: 10,
    word: 'pear',
    meaning: '梨',
    pronunciation: '/peər/',
    isCorrect: null
  }];

  // 加载数据 - 根据听写结果初始化
  useEffect(() => {
    const assignmentId = $w.page.dataset.params?.assignmentId;
    const spellingResultsParam = $w.page.dataset.params?.spellingResults;
    loadReviewData(assignmentId, spellingResultsParam);
  }, []);
  const loadReviewData = (assignmentId, spellingResultsParam) => {
    setIsLoading(true);

    // 模拟API调用获取作业数据
    setTimeout(() => {
      setAssignment({
        id: assignmentId || 1,
        title: '英语单词听写作业',
        totalWords: mockWords.length
      });

      // 处理听写结果
      let initialWords = [...mockWords];
      let initialErrorCount = 0;
      if (spellingResultsParam) {
        try {
          const spellingResults = JSON.parse(spellingResultsParam);

          // 根据听写结果初始化单词状态
          initialWords = mockWords.map(word => {
            const result = spellingResults[word.id];
            if (result === 'correct') {
              return {
                ...word,
                isCorrect: true
              };
            } else if (result === 'incorrect') {
              initialErrorCount++;
              return {
                ...word,
                isCorrect: false
              };
            }
            return {
              ...word,
              isCorrect: null
            };
          });
        } catch (error) {
          console.error('解析听写结果失败:', error);
          // 保持默认状态
        }
      }
      setWords(initialWords);
      setErrorCount(initialErrorCount);
      setIsLoading(false);
    }, 500);
  };

  // 标记单词正确/错误
  const markWord = (index, isCorrect) => {
    const newWords = [...words];
    newWords[index].isCorrect = isCorrect;
    setWords(newWords);

    // 更新错误计数
    const newErrorCount = newWords.filter(word => word.isCorrect === false).length;
    setErrorCount(newErrorCount);
  };

  // 提交核对结果
  const submitResults = () => {
    const unmarkedWords = words.filter(word => word.isCorrect === null);
    if (unmarkedWords.length > 0) {
      toast({
        title: "请完成核对",
        description: `还有 ${unmarkedWords.length} 个单词未标记`,
        variant: "destructive"
      });
      return;
    }

    // 模拟提交结果
    toast({
      title: "提交成功",
      description: `听写结果已提交，错误单词: ${errorCount} 个`
    });

    // 返回首页
    setTimeout(() => {
      $w.utils.navigateTo({
        pageId: 'parentHome',
        params: {}
      });
    }, 2000);
  };

  // 重新听写
  const restartDictation = () => {
    $w.utils.navigateTo({
      pageId: 'dictation',
      params: {
        assignmentId: assignment?.id
      }
    });
  };

  // 返回首页
  const handleBack = () => {
    $w.utils.navigateTo({
      pageId: 'parentHome',
      params: {}
    });
  };
  if (isLoading) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在加载核对内容...</p>
        </div>
      </div>;
  }
  const correctCount = words.filter(word => word.isCorrect === true).length;
  const accuracy = words.length > 0 ? correctCount / words.length * 100 : 0;
  const unmarkedCount = words.filter(word => word.isCorrect === null).length;
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={handleBack} className="mr-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">核对听写结果</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 作业信息 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{assignment?.title}</h2>
                <p className="text-sm text-gray-600">请核对孩子的听写结果</p>
              </div>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                共 {words.length} 个单词
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-white/20 p-3 mr-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-green-100">正确单词</p>
                  <p className="text-2xl font-bold">{correctCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-white/20 p-3 mr-4">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-red-100">错误单词</p>
                  <p className="text-2xl font-bold">{errorCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-white/20 p-3 mr-4">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-blue-100">未标记</p>
                  <p className="text-2xl font-bold">{unmarkedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 正确率进度条 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>正确率统计</CardTitle>
            <CardDescription>当前听写正确率</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>正确率</span>
                <span>{accuracy.toFixed(1)}%</span>
              </div>
              <Progress value={accuracy} className="h-3" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{correctCount} 正确</span>
                <span>{errorCount} 错误</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 单词核对表格 */}
        <Card>
          <CardHeader>
            <CardTitle>单词核对</CardTitle>
            <CardDescription>请标记每个单词的听写结果</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">序号</TableHead>
                    <TableHead>英文单词</TableHead>
                    <TableHead>音标</TableHead>
                    <TableHead>中文释义</TableHead>
                    <TableHead className="w-32">状态</TableHead>
                    <TableHead className="w-48">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {words.map((word, index) => <TableRow key={word.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-semibold text-lg">{word.word}</TableCell>
                      <TableCell className="text-gray-600">{word.pronunciation}</TableCell>
                      <TableCell className="text-gray-600">{word.meaning}</TableCell>
                      <TableCell>
                        {word.isCorrect === true && <Badge className="bg-green-100 text-green-800">
                            正确
                          </Badge>}
                        {word.isCorrect === false && <Badge className="bg-red-100 text-red-800">
                            错误
                          </Badge>}
                        {word.isCorrect === null && <Badge variant="outline">
                            未标记
                          </Badge>}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant={word.isCorrect === true ? "default" : "outline"} size="sm" className="h-8 px-3 bg-green-600 hover:bg-green-700 text-white" onClick={() => markWord(index, true)}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            正确
                          </Button>
                          <Button variant={word.isCorrect === false ? "default" : "outline"} size="sm" className="h-8 px-3 bg-red-600 hover:bg-red-700 text-white" onClick={() => markWord(index, false)}>
                            <XCircle className="w-4 h-4 mr-1" />
                            错误
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* 操作按钮 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between space-x-4">
              <Button variant="outline" onClick={restartDictation} className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                重新听写
              </Button>
              <Button onClick={submitResults} className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                提交结果
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>;
}