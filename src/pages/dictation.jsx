// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Progress, useToast, Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { Play, Pause, RotateCcw, Volume2, CheckCircle, ArrowRight, ArrowLeft, SkipBack, SkipForward, AlertCircle, Check, X, CheckSquare, XSquare } from 'lucide-react';

export default function DictationPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [currentWordIndex, setCurrentWordIndex极狐] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [assignment, setAssignment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playbackQuality, setPlaybackQuality] = useState('good'); // good, fair, poor
  const [showWordNavigator, setShowWordNavigator] = useState(false);
  const [spellingResults, setSpellingResults] = useState({}); // 存储拼写结果 {wordId: 'correct' | 'incorrect'}

  // 模拟单词数据
  const mockWords = [{
    id: 1,
    word: 'apple',
    meaning: '苹果',
    pronunciation: '/ˈæp.əl/',
    example: 'I eat an apple every day.'
  }, {
    id: 2,
    word: 'banana',
    meaning: '香蕉',
    pronunciation: '/bəˈn.ə/',
    example: 'Monkeys love to eat bananas.'
  }, {
    id: 3,
    word: 'orange',
    meaning: '橙子',
    pronunciation: '/ˈɒ极狐r.ɪndʒ/',
    example: 'Orange is my favorite color.'
  }, {
    id: 4,
    word: 'grape',
    meaning: '葡萄',
    pronunciation: '/ɡreɪp/',
    example: 'We grow grapes in our garden.'
  }, {
    id: 5,
    word: 'watermelon',
    meaning: '西瓜',
    pronunciation: '/ˈwɔː.təˌmel.ən/',
    example: 'Watermelon is very refreshing in summer.'
  }, {
    id: 6,
    word: 'strawberry',
    meaning: '草莓',
    pronunciation: '/ˈstrɔː.bər.i/',
    example: 'Strawberry jam is delicious.'
  }, {
    id: 7,
    word: 'pineapple',
    meaning: '菠萝',
    pronunciation: '/ˈpaɪn.æp.əl/',
    example: 'Pineapple grows on tropical plants.'
  }, {
    id: 8,
    word: 'mango',
    meaning: '芒果',
    pronunciation: '/ˈmæŋ.ɡəʊ/',
    example: 'Mango is the king of fruits.'
  }, {
    id: 9,
    word: 'peach',
    meaning: '桃子',
    pronunciation: '/piːtʃ/',
    example: 'Peaches are sweet and juicy.'
  }, {
    id: 10,
    word: 'pear',
    meaning: '梨',
    pronunciation: '/peər/',
    example: 'Pears come in many varieties.'
  }];

  // 模拟加载作业数据
  useEffect(() => {
    const assignmentId = $w.page.dataset.params?.assignmentId;
    const spellingResultsParam = $w.page.dataset.params?.spellingResults;
    loadAssignmentData(assignmentId, spellingResultsParam);
  }, []);
  const loadAssignmentData = (assignmentId, spellingResultsParam) => {
    setIsLoading(true);

    // 模拟API调用
    setTimeout(() => {
      setAssignment({
        id: assignmentId || 1,
        title: '英语单词听写作业',
        totalWords: mockWords.length,
        completedWords: 0,
        textbook: '人教版英语三年级上册',
        unit: 'Unit 1: Hello!'
      });

      // 处理之前的听写结果
      if (spellingResultsParam) {
        try {
          const previousResults = JSON.parse(spellingResultsParam);
          set极狐SpellingResults(previousResults);

          // 找到最后一个已拼写的单词，设置当前索引
          const wordIds = Object.keys(previousResults);
          if (wordIds.length > 0) {
            const lastWordId = parseInt(wordIds[wordIds.length - 1]);
            const lastWordIndex = mockWords.findIndex(word => word.id === lastWordId);
            if (lastWordIndex !== -1) {
              setCurrentWordIndex(lastWordIndex);
            }
          }
        } catch (error) {
          console.error('解析听写结果失败:', error);
          // 保持默认状态
        }
      }
      setIsLoading(false);

      // 自动播放当前单词
      setTimeout(() => {
        playWord();
      }, 300);
    }, 500);
  };

  // 播放当前单词发音（模拟）
  const playWord = () => {
    setIsPlaying(true);
    // 模拟不同的播放质量
    const qualities = ['good', 'fair', 'poor'];
    const randomQuality = qualities[Math.floor(Math.random() * qualities.length)];
    setPlaybackQuality(randomQuality);

    // 模拟播放时间
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  // 暂停播放
  const pausePlayback = () => {
    setIsPlaying(false);
  };

  // 重播当前单词
  const replayWord = () => {
    playWord();
  };

  // 记录拼写结果
  const recordSpellingResult = (wordId, isCorrect) => {
    setSpellingResults(prev => ({
      ...prev,
      [wordId]: isCorrect ? 'correct' : 'incorrect'
    }));
  };

  // 切换到下一个单词
  const nextWord = () => {
    if (currentWordIndex < mockWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      // 自动播放下一个单词
      setTimeout(() => {
        playWord();
      }, 300);
    } else {
      // 听写完成，可以跳转到核对页面或显示完成提示
      console.log('听写完成');
    }
  };

  // 切换到上一个单词
  const prevWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(prev => prev - 1);
      // 自动播放上一个单词
      setTimeout(() => {
        playWord();
      }, 300);
    }
  };

  // 跳转到指定单词
  const jumpToWord = index => {
    if (index >= 0 && index < mockWords.length) {
      setCurrentWordIndex(index);
      // 自动播放跳转到的单词
      setTimeout(() => {
        playWord();
      }, 300);
    }
  };

  // 处理返回
  const handleBack = () => {
    $w.utils.navigateBack();
  };

  // 处理完成听写
  const handleComplete = () => {
    // 计算拼写统计
    const totalWords = mockWords.length;
    const correctCount = Object.values(spellingResults).filter(result => result === 'correct').length;
    const accuracy = totalWords > 0 ? (correctCount / totalWords * 100).toFixed(1) : 0;

    // 跳转到核对页面
    setTimeout(() => {
      $w.utils.navigateTo({
        pageId: 'review',
        params: {
          assignmentId: assignment.id,
          spellingResults: JSON.stringify(spellingResults)
        }
      });
    }, 1500);
  };

  // 获取播放质量图标
  const getQualityIcon = () => {
    switch (playbackQuality) {
      case 'good':
        return <Check className="w-4 h-4 text-green-600" />;
      case 'fair':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'poor':
        return <X className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  // 获取播放质量文本
  const getQualityText = () => {
    switch (playbackQuality) {
      case 'good':
        return '音质良好';
      case 'fair':
        return '音质一般';
      case 'poor':
        return '音质较差';
      default:
        return '未知状态';
    }
  };

  // 获取播放质量颜色类名
  const getQualityColorClass = () => {
    switch (playbackQuality) {
      case 'good':
        return 'text-green-600 bg-green-100';
      case 'fair':
        return 'text-yellow-600 bg-yellow-100';
      case 'poor':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // 获取当前单词的拼写状态
  const getCurrentSpellingStatus = () => {
    const currentWordId = mockWords[currentWordIndex].id;
    return spellingResults[currentWordId];
  };

  // 计算拼写统计
  const calculateSpellingStats = () => {
    const total = mockWords.length;
    const correct = Object.values(spellingResults).filter(result => result === 'correct').length;
    const incorrect = Object.values(spellingResults).filter(result => result === 'incorrect').length;
    const accuracy = total ? (correct / total * 100).toFixed(1) : '0';
    return {
      total,
      correct,
      incorrect,
      accuracy,
      correctCount: correct,
      incorrectCount: incorrect
    };
  };
  if (isLoading) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在加载听写内容...</p>
        </div>
      </div>;
  }
  const currentWord = mockWords[currentWordIndex];
  const progress = (currentWordIndex + 1) / mockWords.length * 100;
  const currentSpellingStatus = getCurrentSpellingStatus();
  const stats = calculateSpellingStats();
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={handleBack} className="mr-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="极狐0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-极狐7 7-7" />
                </svg>
              </Button>
              <Volume2 className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">单词听写</h1>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowWordNavigator(!showWordNavigator)}>
              {showWordNavigator ? '隐藏导航' : '单词导航'}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 作业信息 */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium">{assignment.title}</h2>
                <p className="text-sm text-gray-500">{assignment.textbook} • {assignment.unit}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleBack}>
                返回作业
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 进度和音质 */}
        <Card className="mb-6">
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">进度 {currentWordIndex + 1}/{mockWords.length}</span>
              <Badge variant="secondary" className={getQualityColorClass()}>
                {getQualityIcon()}
                <span className="ml-1">{getQualityText()}</span>
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* 当前单词 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">{currentWord.word}</CardTitle>
            <CardDescription className="text-center">{currentWord.pronunciation}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-700 mb-4">{currentWord.meaning}</p>
            <div className="flex justify-center space-x-4 mb-4">
              {isPlaying ? <Button onClick={pausePlayback}>
                  <Pause className="w-6 h-6" />
                </Button> : <Button onClick={playWord}>
                  <Play className="w-6 h-6" />
                </Button>}
              <Button variant="outline" onClick={replayWord}>
                <RotateCcw className="w-6 h-6" />
              </Button>
            </div>
            <div className="space-x-2">
              <Button onClick={() => recordSpellingResult(currentWord.id, true)} variant="outline">
                <Check className="w-4 h-4 mr-1" />
                拼写正确
              </Button>
              <Button onClick={() => recordSpellingResult(currentWord.id, false)} variant="outline">
                <X className="w-4 h-4 mr-1" />
                拼写错误
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 导航按钮 */}
        <div className="flex justify-between">
          <Button onClick={prevWord} disabled={currentWordIndex === 0} variant="secondary">
            <ArrowLeft className="w-4 h-4 mr-1" /> 上一个
          </Button>
          {currentWordIndex < mockWords.length - 1 ? <Button onClick={nextWord}>
              下一个 <ArrowRight className="w-4 h-4 ml-1" />
            </Button> : <Button onClick={handleComplete}>完成</Button>}
        </div>

        {/* 单词导航 */}
        {showWordNavigator && <Card className="mt-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-5 gap-2">
                {mockWords.map((word, index) => <Button key={word.id} size="sm" variant={index === currentWordIndex ? 'default' : 'outline'} onClick={() => jumpToWord(index)} className={spellingResults[word.id] === 'correct' ? 'bg-green-100' : spellingResults[word.id] === 'incorrect' ? 'bg-red-100' : ''}>
                    {index + 1}
                  </Button>)}
              </div>
            </CardContent>
          </Card>}

        {/* 统计信息 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>统计</CardTitle>
          </CardHeader>
          <CardContent>
            <p>总词数: {stats.total}</p>
            <p>正确: {stats.correct}</p>
            <p>错误: {stats.incorrect}</p>
            <p>准确率: {stats.accuracy}%</p>
          </CardContent>
        </Card>
      </main>
    </div>;
}