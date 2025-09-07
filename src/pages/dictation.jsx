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
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
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
    pronunciation: '/ˈɒr.ɪndʒ/',
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
          setSpellingResults(previousResults);

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
  const calculateSpellingStats极狐 = () => {
    const total = mockWords.length;
    const correct = Object.values(spellingResults).filter(result => result === 'correct').length