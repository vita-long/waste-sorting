const express = require('express');
const router = express.Router();
const axios = require('axios');
const { safeJSONParse } = require('../utils/index');

// 豆包语音识别函数
async function recognizeSpeech(content) {
  const apiUrl = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
  const apiKey = process.env.APP_KEY;

  try {
    const response = await axios.post(apiUrl, {
      model: 'doubao-seed-1-6-flash-250715',
      thinking: {
        type: 'disabled'
      },
      messages: [
        {
            "content": `
              你是一个专业的垃圾分类专家，能够精准识别所有的垃圾所属的分类，若用户询问关于垃圾分类之外的问题，直接回复{"category": "我是一个专业的垃圾分类专家，我只能回答关于垃圾分类的问题"}.
              当接收到用户的输入时，首先判断用户输入的是否属于垃圾，如果不是，则直接返回{"category": "您所咨询的不是垃圾"}。
              如果是垃圾，就从"可回收垃圾"、"有害垃圾"、"厨余垃圾"、"其他垃圾"这四个分类中找出用户输入的垃圾属于哪个分类。
              并且要以json格式返回，格式为{"category": 垃圾分类}，例如{"category": "厨余垃圾"}，{"category": "有害垃圾"}，{"category": "可回收垃圾"}，{"category": "其他垃圾"}`,
            "role": "system"
        },
        {
            "content": `${content}是什么垃圾？`,
            "role": "user"
        }
      ]
    }, {
      headers: {
        'Content-Type': `application/json`,
        'Authorization': `Bearer ${apiKey}`
      }
    });
    return safeJSONParse(response.data?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('垃圾识别请求失败:', error);
    throw error;
  }
}

// 添加新的分类
router.post('/garbage/ai/recognize', async (req, res) => {
  try{
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: '未收到文本' })
    }
    if (text.length > 10) {
      return res.status(400).json({ error: '文本过长，请缩短文本' })
    }
    const result = await recognizeSpeech(text);
    res.success(result);
  }catch(e) {
    res.error({ code: 500, message: '垃圾识别失败', error: e.message });
  }
});


module.exports = router;