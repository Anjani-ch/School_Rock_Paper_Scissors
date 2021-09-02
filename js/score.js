const update = (score, isScoreReset) => isScoreReset ? 0 : score + 1

const updateEl = (el, score) => el.textContent = score

export { update, updateEl }