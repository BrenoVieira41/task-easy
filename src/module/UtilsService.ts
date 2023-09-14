class UtilsService {
  public validateBetween(value: number, min: number = 3, max: number = 255) {
    if (value > max || value < min) return false;
    return true;
  }
}

export default new UtilsService();
