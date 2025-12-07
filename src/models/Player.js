export default class Player {
  constructor(id, name, avatar, lastRank = 0, currentScore = 0) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.lastRank = lastRank;
    this.currentScore = currentScore;
  }

  applyRoundScore({ mode, rank, heoDo, heoDen }) {
    const baseScores = {
      "1-2": { 1: 2, 2: 1, 3: -1, 4: -2 },
      "2-4": { 1: 4, 2: 2, 3: -2, 4: -4 },
    };

    const scoreRank = baseScores[mode][rank];

    // Mặc định nếu không có dữ liệu heo
    heoDo = heoDo || 0;
    heoDen = heoDen || 0;

    // Quy tắc tính điểm heo, heo đỏ 2 điểm, ăn thì trừ 2, thua thì trừ 1
    const score = scoreRank + heoDo * 2 + heoDen * 1;

    this.currentScore += score;
    this.lastRank = rank;

    return score;
  }
}
