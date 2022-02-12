class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const searchName = this.queryStr.search
      ? {
          name: {
            $regex: this.queryStr.search,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...searchName });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    // Remove fields from query

    const removeFields = [
      "search",
      "page",
      "sort",
      "maxPriceVal",
      "minPriceVal",
    ];
    removeFields.forEach((el) => delete queryCopy[el]);

    // console.log(queryCopy);

    this.query = this.query.find(queryCopy);
    return this;
  }

  rangeFilter() {
    const queryCopy = { ...this.queryStr };
    // Remove fields from query

    const removeFields = ["search", "page", "sort"];
    removeFields.forEach((el) => delete queryCopy[el]);

    let { minPriceVal, maxPriceVal } = queryCopy;

    // console.log(minPriceVal, maxPriceVal);

    this.query = this.query.find({
      price: { $gte: minPriceVal, $lte: maxPriceVal },
    });
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortByArr = this.queryStr.sort.split(",");
      const sortByStr = sortByArr.join(" ");
      this.query = this.query.sort(sortByStr);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIFeatures;
