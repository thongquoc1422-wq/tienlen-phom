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
    heoDo = heoDo || { eaten: 0, lost: 0 };
    heoDen = heoDen || { eaten: 0, lost: 0 };

    // Quy tắc tính điểm heo
    const score =
      scoreRank +
      heoDo.eaten * 2 -
      heoDo.lost * 2 +
      heoDen.eaten * 1 -
      heoDen.lost * 1;

    this.currentScore += score;
    this.lastRank = rank;

    return score;
  }
}
