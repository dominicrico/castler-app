export default dd2dms = (D, lng) => {
  return {
        dir : D<0?lng?'W':'S':lng?'E':'N',
        deg : 0|(D<0?D=-D:D),
        min : 0|D%1*60,
        sec :((0|D*60%1*6000)/100).toFixed(4)
    };
}
