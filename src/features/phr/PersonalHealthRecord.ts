export interface PersonalHealthRecord {
  age: number;
  weight: number;
  height: number;
  gender: Gender;
  activeFactor: number;
}

// 性别
export enum Gender {
  Man = 1,
  Woman = 2,
}

// 计算基础代谢率（BMR）
export const getBMR = (record: PersonalHealthRecord): number => {
  const factor = record.gender === Gender.Man ? MAN_FACTOR : WOMAN_FACTOR;
  return +(
    factor.base -
    factor.age * record.age +
    factor.height * record.height +
    factor.weight * record.weight
  ).toFixed(2);
};

const MAN_FACTOR = {
  base: 66,
  age: 6.8,
  height: 5,
  weight: 13.7,
};

const WOMAN_FACTOR = {
  base: 655,
  age: 4.7,
  height: 1.8,
  weight: 9.6,
};

// 计算体质指数（BMI）
export const getBMI = (record: PersonalHealthRecord): number => {
  return +(record.weight / Math.pow(record.height / 100, 2)).toFixed(2);
};

// 计算每日所需热量
export const getDailyCalories = (record: PersonalHealthRecord): number => {
  return +(getBMR(record) * record.activeFactor).toFixed(2);
};

// 每日食物提示词
export const getDailyFoodsPrompt = (record: PersonalHealthRecord): string => {
  // 这里的提示词，可以根据每日所需热量，来提示用户每日应该摄入的食物列表
  return `现在请你模拟一个专业的食品营养师，当我给你发送消息时，请你以json格式回复我，回复的数据结构是{"code":200, data: "回复内容"}，除了json格式外请不要回答我任何信息，下面我会给你一个json格式的数据，里面记录了一个人所在的区域，每日需要摄入的卡路里量，请根据这个数据返回一个json格式的数据，这个数据里面是这个人7天的推荐食谱，这个食谱当中，营养需要均衡，搭配需要合理，并且不能是某一类食物，而要是具体的某一道菜，返回数据格式是[{"day": 1, "meals": [{"kind": "breakfast", "foods": ['食物']}]}]，data is：${JSON.stringify(
    { area: "China", calories: getDailyCalories(record) }
  )}`;
};
