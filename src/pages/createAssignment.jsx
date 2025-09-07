// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge, Alert, AlertDescription, AlertTitle, useToast, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { Upload, FileText, X, Edit, Trash2, CheckCircle, AlertCircle, Plus, BookOpen, BookMarked } from 'lucide-react';

export default function CreateAssignment(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [validationResult, setValidationResult] = useState({
    isValid: false,
    errors: []
  });
  const [words, setWords] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editWord, setEditWord] = useState('');
  const [selectedTextbook, setSelectedTextbook] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // 模拟教材数据
  const textbooks = [{
    id: 'pep_english_3',
    name: '人教版英语三年级上册',
    units: [{
      id: 'unit1',
      name: 'Unit 1: Hello!',
      words: ['hello', 'hi', 'goodbye', 'bye', 'name']
    }, {
      id: 'unit2',
      name: 'Unit 2: My Family',
      words: ['family', 'father', 'mother', 'brother', 'sister']
    }, {
      id: 'unit3',
      name: 'Unit 3: My School',
      words: ['school', 'classroom', 'teacher', 'student', 'book']
    }]
  }, {
    id: 'pep_english_4',
    name: '人教版英语四年级上册',
    units: [{
      id: 'unit1',
      name: 'Unit 1: My Classroom',
      words: ['classroom', 'window', 'door', 'desk', 'chair']
    }, {
      id: 'unit2',
      name: 'Unit 2: My Schoolbag',
      words: ['schoolbag', 'pencil', 'pen', 'ruler', 'eraser']
    }, {
      id: 'unit3',
      name: 'Unit 3: My Friends',
      words: ['friend', 'tall', 'short', 'thin', 'strong']
    }]
  }, {
    id: 'oxford_english_3',
    name: '牛津英语三年级上册',
    units: [{
      id: 'unit1',
      name: 'Unit 1: Greetings',
      words: ['good morning', 'good afternoon', 'good evening', 'nice to meet you']
    }, {
      id: 'unit2',
      name: 'Unit 2: Numbers',
      words: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
    }, {
      id: 'unit3',
      name: 'Unit 3: Colors',
      words: ['red', 'blue', 'green', 'yellow', 'orange', 'purple']
    }]
  }];

  // 获取当前选择的教材
  const currentTextbook = textbooks.find(t => t.id === selectedTextbook);
  // 获取当前选择的单元
  const currentUnit = currentTextbook?.units.find(u => u.id === selectedUnit);

  // 根据教材单元生成词汇表
  const generateVocabulary = () => {
    if (!currentUnit) {
      toast({
        title: "请选择单元",
        description: "请先选择教材和单元",
        variant: "destructive"
      });
      return;
    }
    setIsGenerating(true);

    // 模拟生成过程
    setTimeout(() => {
      const generatedWords = currentUnit.words.map((word, index) => ({
        id: Date.now() + index,
        word: word,
        meaning: getWordMeaning(word)
      }));
      setWords(generatedWords);
      setIsGenerating(false);
      toast({
        title: "词汇表生成成功",
        description: `已生成 ${generatedWords.length} 个单词`
      });
    }, 1000);
  };

  // 模拟获取单词释义
  const getWordMeaning = word => {
    const meanings = {
      'hello': '你好',
      'hi': '嗨',
      'goodbye': '再见',
      'bye': '拜拜',
      'name': '名字',
      'family': '家庭',
      'father': '爸爸',
      'mother': '妈妈',
      'brother': '兄弟',
      'sister': '姐妹',
      'school': '学校',
      'classroom': '教室',
      'teacher': '老师',
      'student': '学生',
      'book': '书',
      'window': '窗户',
      'door': '门',
      'desk': '书桌',
      'chair': '椅子',
      'schoolbag': '书包',
      'pencil': '铅笔',
      'pen': '钢笔',
      'ruler': '尺子',
      'eraser': '橡皮',
      'friend': '朋友',
      'tall': '高的',
      'short': '矮的',
      'thin': '瘦的',
      'strong': '强壮的',
      'good morning': '早上好',
      'good afternoon': '下午好',
      'good evening': '晚上好',
      'nice to meet you': '很高兴见到你',
      'one': '一',
      'two': '二',
      'three': '三',
      'four': '四',
      'five': '五',
      'six': '六',
      'seven': '七',
      'eight': '八',
      'nine': '九',
      'ten': '十',
      'red': '红色',
      'blue': '蓝色',
      'green': '绿色',
      'yellow': '黄色',
      'orange': '橙色',
      'purple': '紫色'
    };
    return meanings[word] || '暂无释义';
  };

  // 模拟Excel文件解析和验证
  const handleFileUpload = event => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    // 检查文件类型
    if (!selectedFile.name.endsWith('.xlsx') && !selectedFile.name.endsWith('.xls')) {
      toast({
        title: "文件格式错误",
        description: "请上传Excel文件(.xlsx或.xls格式)",
        variant: "destructive"
      });
      return;
    }
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setIsUploading(true);

    // 模拟文件解析和验证过程
    setTimeout(() => {
      // 模拟解析结果 - 这里应该是实际的Excel解析逻辑
      const mockWords = [{
        id: 1,
        word: 'apple',
        meaning: '苹果'
      }, {
        id: 2,
        word: 'banana',
        meaning: '香蕉'
      }, {
        id: 3,
        word: 'orange',
        meaning: '橙子'
      }, {
        id: 4,
        word: 'grape',
        meaning: '葡萄'
      }, {
        id: 5,
        word: 'watermelon',
        meaning: '西瓜'
      }];

      // 模拟验证结果
      const mockValidation = {
        isValid: true,
        errors: [],
        stats: {
          total: mockWords.length,
          valid: mockWords.length,
          invalid: 0
        }
      };
      setWords(mockWords);
      setValidationResult(mockValidation);
      setIsUploading(false);
      toast({
        title: "文件上传成功",
        description: `成功解析 ${mockWords.length} 个单词`
      });
    }, 1500);
  };
  const handleEdit = (index, word) => {
    setEditingIndex(index);
    setEditWord(word.word);
  };
  const handleSaveEdit = index => {
    const newWords = [...words];
    newWords[index].word = editWord;
    setWords(newWords);
    setEditingIndex(-1);
    setEditWord('');
    toast({
      title: "修改成功",
      description: "单词已更新"
    });
  };
  const handleDelete = index => {
    const newWords = words.filter((_, i) => i !== index);
    setWords(newWords);
    toast({
      title: "删除成功",
      description: "单词已删除"
    });
  };
  const handleAddWord = () => {
    const newWord = {
      id: Date.now(),
      word: '',
      meaning: ''
    };
    setWords([...words, newWord]);
    setEditingIndex(words.length);
    setEditWord('');
  };
  const handlePublishAssignment = () => {
    if (words.length === 0) {
      toast({
        title: "无法发布作业",
        description: "请至少添加一个单词",
        variant: "destructive"
      });
      return;
    }

    // 检查是否有空单词
    const emptyWords = words.filter(word => !word.word.trim());
    if (emptyWords.length > 0) {
      toast({
        title: "无法发布作业",
        description: "请填写所有单词内容",
        variant: "destructive"
      });
      return;
    }

    // 模拟发布作业
    toast({
      title: "作业发布成功",
      description: `已发布包含 ${words.length} 个单词的作业`
    });

    // 返回首页
    setTimeout(() => {
      $w.utils.navigateBack();
    }, 2000);
  };
  const handleCancel = () => {
    $w.utils.navigateBack();
  };
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={handleCancel} className="mr-4">
                <X className="w-5 h-5" />
              </Button>
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">布置新作业</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 教材选择区域 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
              教材选择
            </CardTitle>
            <CardDescription>
              选择教材和单元，系统将自动生成对应的听写词汇表
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 教材选择 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  选择教材
                </label>
                <Select value={selectedTextbook} onValueChange={setSelectedTextbook}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="请选择教材" />
                  </SelectTrigger>
                  <SelectContent>
                    {textbooks.map(textbook => <SelectItem key={textbook.id} value={textbook.id}>
                        {textbook.name}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {/* 单元选择 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  选择单元
                </label>
                <Select value={selectedUnit} onValueChange={setSelectedUnit} disabled={!selectedTextbook}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={selectedTextbook ? "请选择单元" : "请先选择教材"} />
                  </SelectTrigger>
                  <SelectContent>
                    {currentTextbook?.units.map(unit => <SelectItem key={unit.id} value={unit.id}>
                        {unit.name}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 生成按钮 */}
            {selectedUnit && <div className="mt-4">
                <Button onClick={generateVocabulary} disabled={isGenerating} className="w-full md:w-auto">
                  {isGenerating ? <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      生成中...
                    </> : <>
                      <BookMarked className="w-4 h-4 mr-2" />
                      生成词汇表
                    </>}
                </Button>
              </div>}
          </CardContent>
        </Card>

        {/* 文件上传区域 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>上传单词列表</CardTitle>
            <CardDescription>
              支持Excel格式文件，包含单词和中文释义两列
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Upload className="w-12 h-12 text-gray-400" />
                <div className="text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>点击上传文件</span>
                    <input id="file-upload" name="file-upload" type="file" accept=".xlsx,.xls" onChange={handleFileUpload} className="sr-only" />
                  </label>
                  <p className="pl-1">或拖拽文件到这里</p>
                </div>
                <p className="text-xs text-gray-500">
                  支持Excel格式 (.xlsx, .xls)
                </p>
              </div>
            </div>

            {fileName && <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-800">
                    {fileName}
                  </span>
                  {isUploading && <div className="ml-4">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    </div>}
                </div>
              </div>}
          </CardContent>
        </Card>

        {/* 校验结果提示 */}
        {validationResult.isValid && words.length > 0 && <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <AlertTitle>文件验证通过</AlertTitle>
            <AlertDescription>
              成功解析 {words.length} 个单词，所有格式正确
            </AlertDescription>
          </Alert>}

        {!validationResult.isValid && validationResult.errors.length > 0 && <Alert variant="destructive" className="mb-6">
            <AlertCircle className="w-5 h-5" />
            <AlertTitle>文件验证失败</AlertTitle>
            <AlertDescription>
              发现 {validationResult.errors.length} 个格式错误，请检查文件内容
            </AlertDescription>
          </Alert>}

        {/* 单词列表预览 */}
        {words.length > 0 && <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>单词列表预览</CardTitle>
                  <CardDescription>
                    共 {words.length} 个单词，支持编辑和删除
                  </CardDescription>
                </div>
                <Button onClick={handleAddWord} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  添加单词
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">序号</TableHead>
                      <TableHead>英文单词</TableHead>
                      <TableHead>中文释义</TableHead>
                      <TableHead className="w-24">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {words.map((word, index) => <TableRow key={word.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {editingIndex === index ? <Input value={editWord} onChange={e => setEditWord(e.target.value)} className="h-8" autoFocus /> : <span className="font-medium">{word.word}</span>}
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-600">{word.meaning}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {editingIndex === index ? <Button variant="outline" size="sm" onClick={() => handleSaveEdit(index)}>
                                保存
                              </Button> : <Button variant="ghost" size="sm" onClick={() => handleEdit(index, word)}>
                                <Edit className="w-4 h-4" />
                              </Button>}
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(index)}>
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>}

        {/* 操作按钮 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={handleCancel}>
                取消
              </Button>
              <Button onClick={handlePublishAssignment} disabled={words.length === 0}>
                布置作业
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>;
}