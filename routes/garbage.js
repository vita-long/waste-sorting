const express = require('express');
const router = express.Router();
const {garbageItem, garbageCateGory } = require('../models');
// 查询所有分类信息
router.get('/garbage/categories', async function(req, res, next) {
  try {
    const items = await garbageCateGory.aggregate([
      { 
        $project: {
          id: '$_id',  // 将 _id 映射为 id
          name: 1,      // 保留其他字段
          icon: 1,
          type: 1,
          createdAt: 1,
          _id: 0       // 隐藏原始 _id
        }
      }
    ]);
    res.success(items);
  } catch (err) {
    res.error(err.message, 500);
  }
});

// 删除垃圾分类
router.delete('/garbage/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await garbageCateGory.findOneAndDelete({
      _id: id,
    });
    res.success(deletedItem, '删除成功');
  } catch (err) {
    res.error(err.message, 500);
  }
});

// 查询分类下垃圾集合
router.get('/garbage/search/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const items = await garbageItem.find({
      categoryId: { $regex: String(categoryId), $options: 'i' }
    });
    res.success(items);
  } catch (err) {
    res.error(err.message, 500);
  }
});

// 添加新的垃圾分类项
router.post('/garbage/create', async (req, res) => {
  const { name, category, categoryId, description, tips, commonItems } = req.body;
  
  const item = new garbageItem({
    name,
    category,
    categoryId,
    description,
    tips,
    commonItems
  });

  try {
    const newItem = await item.save();
    res.success(newItem);
  } catch (err) {
    res.error(err.message, 500);
  }
});

// 添加新的分类
router.post('/garbage/category/create', async (req, res) => {
  const { name, icon, description } = req.body;
  
  const item = new garbageCateGory({
    name,
    icon,
    description
  });

  try {
    const newItem = await item.save();
    res.success(newItem);
  } catch (err) {
    res.error(err.message, 500);
  }
});

module.exports = router;
