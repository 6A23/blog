const database = {
  '项羽': {
    tag: '西楚霸王',
    description: `项羽（公元前232年—公元前202年），名籍，字羽，楚国下相人，西楚霸王。\n\n他力拔山兮气盖世，巨鹿之战以少胜多，大破秦军，威震天下。鸿门宴上放走刘邦，留下千古遗憾。\n\n最终被围垓下，四面楚歌，乌江自刎，英雄末路，令人扼腕。\n\n"生当作人杰，死亦为鬼雄。" —— 李清照`,
  },
  '项庄': {
    tag: '项羽堂弟',
    description: `项庄，项羽的堂弟，楚军将领。\n\n鸿门宴上，项庄奉范增之命，以"舞剑助兴"为由，意图刺杀刘邦。\n\n然而项伯挺身而出，也拔剑起舞，以身护住刘邦，使项庄无从下手。\n\n"项庄舞剑，意在沛公" —— 此典故流传千古。`,
  },
  '项伯': {
    tag: '项羽叔父',
    description: `项伯，项羽的叔父，为人重情义。\n\n鸿门宴前夜，他连夜奔赴刘邦营地，私告张良，救了刘邦一命。宴上又以身护住刘邦，阻止项庄行刺。\n\n后来汉朝建立，刘邦感念其恩，赐其刘姓，封射阳侯。`,
  },
  '项梁': {
    tag: '项羽叔父·起义首领',
    description: `项梁，项羽的叔父，楚国名将项燕之子。\n\n秦末天下大乱，项梁与项羽起兵江东，拥立楚怀王，成为反秦义军的重要领袖。\n\n可惜定陶一战轻敌冒进，被秦将章邯击败，壮志未酬身先死。`,
  },
  '项梓涵': {
    tag: '体育健将',
    description: '我是体育健将！',
  },
  '项梓淇': {
    tag: '画画高手',
    description: '我是画画高手！',
  },
};

export default function handler(req, res) {
  // 允许跨域（任何网站都能调用）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  const { name } = req.query;

  if (!name) {
    return res.status(400).json({
      code: 400,
      message: '请传入 name 参数，例如：/api/xiong?name=项羽',
    });
  }

  const data = database[name];

  if (!data) {
    return res.status(404).json({
      code: 404,
      message: `"${name}" 不在项家族谱中`,
    });
  }

  return res.status(200).json({
    code: 200,
    name: name,
    tag: data.tag,
    description: data.description,
  });
}
