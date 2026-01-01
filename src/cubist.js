// math, 3D2D
class CubistVector {
  static add (a, b) {
    if (!['object', 'number'].includes(typeof a)) {throw Error(`1st argument should be object or number. now set type ${typeof a} (a = ${a})`)}
    if (!['object', 'number'].includes(typeof b)) {throw Error(`2nd argument should be object or number. now set type ${typeof b} (b = ${b})`)}

    if (typeof a == 'object' && typeof b == 'object') {
      if (a.length != b.length) {throw Error(`arguments length should be matched. now a.length = ${a.length} and b.length = ${b.length}`);}
      return a.map((value, index) => a[index] + b[index]);
    } else if (typeof a == 'number' && typeof b == 'object') {
      return b.map(value => a + value);
    } else if (typeof a == 'object' && typeof b == 'number') {
      return a.map(value => b + value);
    } else {
      return a + b;
    }
  }
  static sum (al) {
    if (typeof al != 'object') {throw Error(`argument should be object. now set type ${typeof al} (al = ${al})`)}

    if (al.length == 1) {
      return al[0];
    } else if (al.length == 2) {
      return CubistVector.add(al[0], al[1]);
    } else {
      return CubistVector.sum([CubistVector.add(al[0], al[1])].concat(al.slice(2)));
    }
  }
  static multi (a, b) {
    if (!['object', 'number'].includes(typeof a)) {throw Error(`1st argument should be object or number. now set type ${typeof a} (a = ${a})`)}
    if (!['object', 'number'].includes(typeof b)) {throw Error(`2nd argument should be object or number. now set type ${typeof b} (b = ${b})`)}

    if (typeof a == 'object' && typeof b == 'object') {
      if (a.length != b.length) {throw Error(`arguments length should be matched. now a.length = ${a.length} and b.length = ${b.length}`);}
      return a.map((value, index) => a[index]*b[index]);
    } else if (typeof a == 'number' && typeof b == 'object') {
      return b.map(value => a*value);
    } else if (typeof a == 'object' && typeof b == 'number') {
      return a.map(value => b*value);
    } else {
      return a*b;
    }
  }
  static pi (al) {
    if (typeof al != 'object') {throw Error(`argument should be object. now set type ${typeof al} (al = ${al})`)}

    if (al.length == 1) {
      return al[0];
    } else if (al.length == 2) {
      return CubistVector.multi(al[0], al[1]);
    } else {
      return CubistVector.pi([CubistVector.multi(al[0], al[1])].concat(al.slice(2)));
    }
  }
  static outer (a, b) {
    if (typeof a != 'object') {throw Error(`1st argument should be object. now set type ${typeof a} (a = ${a})`)}
    if (typeof b != 'object') {throw Error(`2nd argument should be object. now set type ${typeof b} (b = ${b})`)}
    if (a.length != 3 || b.length != 3) {throw Error(`argument length should be 3. now a.length = ${a.length} and b.length = ${b.length}`);}
    
    return [a[1]*b[2] - a[2]*b[1], a[2]*b[0] - a[0]*b[2], a[0]*b[1] - a[1]*b[0]];
  }
}
class CubistThreedee {
  static rotate (xyz, rotateTime = 0) {
    if (typeof xyz != 'object') {throw Error(`1st argument should be object. now set type ${typeof xyz} (xyz = ${xyz})`);}
    if (xyz.length != 3) {throw Error(`1st argument length should be 3. now xyz.length = ${typeof xyz.length}`);}
    if (typeof rotateTime != 'number') {throw Error(`2nd argument should be number. now set type ${typeof rotateTime} (time = ${rotateTime})`);}
    
    if (rotateTime % 3 < 1) {
      return xyz;
    } else if (rotateTime % 3 == 1) {
      return [xyz[2], xyz[0], xyz[1]];
    } else if (rotateTime % 3 == 2) {
      return [xyz[1], xyz[2], xyz[0]];
    } else {
      return this.rotate([xyz[2], xyz[0], xyz[1]], rotateTime - 1);
    }
  }
  static backWards (xyz, back = true) {
    if (typeof xyz != 'object') {throw Error(`1st argument should be object. now set type ${typeof xyz} (xyz = ${xyz})`);}
    if (xyz.length != 3) {throw Error(`1st argument length should be 3. now xyz.length = ${typeof xyz.length}`);}
    
    if (back) {
      return CubistVector.add(1, CubistVector.multi(-1, xyz));
    } else {
      return xyz;
    };
  }
  static spin (originxyz, centerxyz, direction, degree) {
    if (typeof originxyz != 'object') {throw Error(`1st argument should be object. now set type ${typeof originxyz} (originxyz = ${originxyz})`);}
    if (originxyz.length != 3) {throw Error(`1st argument length should be 3. now originxyz.length = ${typeof originxyz.length}`);}
    if (typeof centerxyz != 'object') {throw Error(`2nd argument should be object. now set type ${typeof centerxyz} (centerxyz = ${centerxyz})`);}
    if (centerxyz.length != 3) {throw Error(`2nd argument length should be 3. now centerxyz.length = ${typeof centerxyz.length}`);}
    if (typeof direction != 'object') {throw Error(`3rd argument should be object. now set type ${typeof direction} (direction = ${direction})`);}
    if (direction.length != 3) {throw Error(`3rd argument length should be 3. now direction.length = ${typeof direction.length}`);}
    if (typeof degree != 'number') {throw Error(`4th argument should be number. now set type ${typeof degree} (degree = ${degree})`);}
    
    const radian = degree/180*Math.PI
    return CubistVector.sum([
      CubistVector.pi([centerxyz, 1 - Math.cos(radian), CubistVector.add(1, CubistVector.multi(-1, direction))]),
      CubistVector.multi(originxyz, CubistVector.add(Math.cos(radian), CubistVector.multi(1 - Math.cos(radian), direction))),
      CubistVector.outer(CubistVector.add(originxyz, CubistVector.multi(-1, centerxyz)), CubistVector.multi(Math.sin(radian), direction))
    ]);
  }
  static strain (xyz, strainConstant) {
    if (typeof strainConstant != 'number') {throw Error(`2nd argument should be number. now set type ${typeof strainConstant} (strainConstant = ${strainConstant})`);}
    
    return (CubistVector.pi([
      xyz,
      CubistVector.add(1, CubistVector.multi(- strainConstant, CubistThreedee.rotate(xyz, 1))),
      CubistVector.add(1, CubistVector.multi(- strainConstant, CubistThreedee.rotate(xyz, 2)))
    ]));
    // 簡略化前は / (1-(xyz[0]*xyz[1]+xyz[1]*xyz[2]+xyz[2]*xyz[0])*strainConstant**2+2*xyz[0]*xyz[1]*xyz[2]*strainConstant**3),
  }
  static linear (xyz, bases) {
    if (typeof xyz != 'object') {throw Error(`1st argument should be object. now set type ${typeof xyz} (xyz = ${xyz})`);}
    if (xyz.length != 3) {throw Error(`1st argument length should be 3. now xyz.length = ${typeof xyz.length}`);}
    if (typeof bases != 'object') {throw Error(`2nd argument should be object. now set type ${typeof bases} (bases = ${bases})`);}
    if (bases.length != 3) {throw Error(`2nd argument length should be 3. now bases.length = ${typeof bases.length}`);}
    if (bases.map(base => base.length) == [2, 2, 2]) {throw Error(`2nd argument item length should be 2. now bases[0~2].length = ${typeof bases.map(base => base.length)}`);}

    return [
      bases[0][0] * xyz[0] + bases[1][0] * xyz[1] + bases[2][0] * xyz[2],
      bases[0][1] * xyz[0] + bases[1][1] * xyz[1] + bases[2][1] * xyz[2]
    ];
  }
}
class CubistTwodee {
  static rotate (xy, rotateTime = 0) {
    if (typeof xy != 'object') {throw Error(`1st argument should be object. now set type ${typeof xy} (xy = ${xy})`);}
    if (xy.length != 2) {throw Error(`1st argument length should be 2. now xy.length = ${typeof xy.length}`);}
    if (typeof rotateTime != 'number') {throw Error(`2nd argument should be number. now set type ${typeof rotateTime} (time = ${rotateTime})`);}
    
    if (rotateTime % 4 < 1) {
      return xy;
    } else if (rotateTime % 4 == 1) {
      return [xy[1], -xy[0]];
    } else if (rotateTime % 4 == 2) {
      return [-xy[0], -xy[1]];
    } else if (rotateTime % 4 == 3) {
      return [-xy[1], xy[0]];
    } else {
      return this.rotate([xy[1], -xy[0]], rotateTime - 1);
    }
  }
}

// cube
class CubistFace {
  #isFront; #rotate;
  constructor ({isFront, rotate}) {
    if (!([true,false].includes(isFront))) {throw TypeError();}
    if (!(0 <= rotate && rotate < 3)) {throw TypeError();}

    this.#isFront = isFront;
    this.#rotate = rotate;
  }

  isFront () {
    return this.#isFront;
  }
  getRotate () {
    return this.#rotate;
  }

  getOpposite () {
    return new CubistFace({
      isFront: !this.#isFront,
      rotate: this.#rotate
    });
  }
  getSecond () {
    return new CubistFace({
      isFront: this.#isFront,
      rotate: (this.#rotate + 1)%3
    });
  }
  getThird () {
    return new CubistFace({
      isFront: this.#isFront,
      rotate: (this.#rotate + 2)%3
    });
  }
  getSides () {
    return [
      this.getSecond(),
      this.getThird(),
      this.getSecond().getOpposite(),
      this.getThird().getOpposite(),
    ];
  }
  getArounds (on) {
    if (!(on instanceof CubistFace)) {throw TypeError();}
    return [
      this,
      CubistFace.getThirdByTwoFaces(this, on),
      this.getOpposite(),
      CubistFace.getThirdByTwoFaces(this, on).getOpposite(),
    ];
  }
  static isNext (a, b) {
    if (!(a instanceof CubistFace)) {throw TypeError();}
    if (!(b instanceof CubistFace)) {throw TypeError();}

    return a.getRotate() != b.getRotate();
  }
  static getThirdByTwoFaces (a, b) {
    if (!(a instanceof CubistFace)) {throw TypeError();}
    if (!(b instanceof CubistFace)) {throw TypeError();}
    if (!(CubistFace.isNext(a, b))) {throw Error();}

    return new CubistFace({
      isFront: ((a.isFront()? 1: -1) * (b.isFront()? 1: -1) * ((a.getRotate() - b.getRotate() + 3)%3 == 2? 1: -1) == 1),
      rotate: 3 - a.getRotate() - b.getRotate()
    });
  }

  convert (cordinate) {
    if (this.#isFront) {
      return [
        cordinate[(-this.#rotate+3)%3],
        cordinate[(-this.#rotate+1+3)%3],
        cordinate[(-this.#rotate+2+3)%3],
      ];
    } else {
      return [
        1 - cordinate[(-this.#rotate+3)%3],
        1 - cordinate[(-this.#rotate+1+3)%3],
        1 - cordinate[(-this.#rotate+2+3)%3],
      ];
    }
  }
  
  static getFaceByName (name) {
    if (!(new RegExp("^[frubld]$").test(name))) {throw TypeError();}

    return new CubistFace({
      isFront: new RegExp("^[fru]$").test(name),
      rotate: new RegExp("^[fru]$").test(name)? ["f","r","u"].indexOf(name): ["b","l","d"].indexOf(name)
    });
  }
  toString () {
    return this.#isFront? ["f","r","u"][this.#rotate]: ["b","l","d"][this.#rotate];
  }

  static *allFaces () {
    for (let isFront of [true, false]) {
      for (let rotate = 0; rotate < 3; rotate++) {
        yield new CubistFace({isFront, rotate});
    } }
  }
}
class CubistCell {
  #column; #row;
  constructor ({column, row}) {
    if (!(0 <= column && column < 3)) {throw TypeError();}
    if (!(0 <= row && row < 3)) {throw TypeError();}

    this.#column = column;
    this.#row = row;
  }

  getColumn () {
    return this.#column;
  }
  getRow () {
    return this.#row;
  }

  getCordinates () {
    return [
      [0, this.#column/3, this.#row/3],
      [0, (this.#column+1)/3, this.#row/3],
      [0, (this.#column+1)/3, (this.#row+1)/3],
      [0, this.#column/3, (this.#row+1)/3],
    ];
  }

  static *allCells () {
    for (let column = 0; column < 3; column++) {
      for (let row = 0; row < 3; row++) {
        yield new CubistCell({column, row});
    } }
  }
}
class CubistSticker {
  #face; #cell;
  constructor ({face, cell}) {
    if (!(face instanceof CubistFace)) {throw TypeError();}
    if (!(cell instanceof CubistCell)) {throw TypeError();}

    this.#face = face;
    this.#cell = cell;
  }

  getFace () {
    return this.#face;
  }

  getName () {
    const secondThird = [
      [this.#face.getSecond().toString(), "", this.#face.getSecond().getOpposite().toString()][this.#cell.getColumn()],
      [this.#face.getThird().toString(), "", this.#face.getThird().getOpposite().toString()][this.#cell.getRow()]
    ].filter(name => name != "");

    if (this.#cell.getColumn() != 1 && this.#cell.getRow() != 1) {
      if (this.#cell.getColumn() == this.#cell.getRow()){
        return this.#face.toString() + secondThird.join("");
      } else {
        return this.#face.toString() + secondThird.reverse().join("")
      }
    } else {
      return this.#face.toString() + secondThird.join("");
    }
  }
  getCordinates () {
    return this.#cell.getCordinates().map(cordinate => this.#face.convert(cordinate));
  }

  static getStickerByName (name) {
    const list = name.split("");

    if (list.length == 1) {
      return new CubistSticker({
        face: CubistFace.getFaceByName(list[0]),
        cell: new CubistCell({column: 1, row: 1})
      });
    } else if (list.length == 2) {
      return CubistSticker.getStickerByTwoFaces(
        CubistFace.getFaceByName(list[0]),
        CubistFace.getFaceByName(list[1]), 0,
        CubistFace.getThirdByTwoFaces(CubistFace.getFaceByName(list[0]), CubistFace.getFaceByName(list[1])), 1
      );
    } else {
      return CubistSticker.getStickerByTwoFaces(
        CubistFace.getFaceByName(list[0]),
        CubistFace.getFaceByName(list[1]), 0,
        CubistFace.getFaceByName(list[2]), 0
      );
    }
  }
  static getStickerByTwoFaces (onFace, aFace, aDistance, bFace, bDistance) {
    if (!(onFace instanceof CubistFace)) {throw TypeError();}
    if (!(aFace instanceof CubistFace)) {throw TypeError();}
    if (!(bFace instanceof CubistFace)) {throw TypeError();}
    if (!(CubistFace.isNext(onFace, aFace))) {throw Error();}
    if (!(CubistFace.isNext(onFace, bFace))) {throw Error();}
    if (!(CubistFace.isNext(aFace, bFace))) {throw Error();}
    if (!(0 <= aDistance && aDistance < 3)) {throw Error();}
    if (!(0 <= bDistance && bDistance < 3)) {throw Error();}

    const sideFaces = onFace.getSides();
    const aSide = sideFaces.map(face => face.toString()).indexOf(aFace.toString());
    const bSide = sideFaces.map(face => face.toString()).indexOf(bFace.toString());

    let column;
    let row;
    for (let [side, distance] of [[aSide, aDistance], [bSide, bDistance]]) {
      if (side % 2 == 0) {
        column = side < 2? distance: 2 - distance;
      } else {
        row = side < 2? distance: 2 - distance;
      }
    }

    return new CubistSticker({
      face: onFace,
      cell: new CubistCell({column, row})
    });
  }

  static *allStickersOnFace (face) {
    for (let cell of CubistCell.allCells()) {
      yield new CubistSticker({face, cell});
    }
  }
  static *allStickersNextFace (face) {
    for (let nextFace of face.getSides()) {
      const lastFace = CubistFace.getThirdByTwoFaces(nextFace, face);

      for (let i = 0; i < 3; i++) {
        yield CubistSticker.getStickerByTwoFaces(
          nextFace,
          face, 0,
          lastFace, i
        );
    } }
  }
  static *allStickersBetweenFaces (face, oppositeFace = face.getOpposite()) {
    for (let nextFace of face.getSides()) {
      const lastFace = CubistFace.getThirdByTwoFaces(nextFace, face);

      for (let i = 0; i < 3; i++) {
        yield CubistSticker.getStickerByTwoFaces(
          nextFace,
          face, 1,
          lastFace, i
        );
    } }
  }
  static *allStickers () {
    for (let face of CubistFace.allFaces()) {
      for (let cell of CubistCell.allCells()) {
        yield new CubistSticker({face, cell});
    } }
  }
}
class CubistCube {
  static SVGURL = "http://www.w3.org/2000/svg";
  static strainConstant = 1/10;
  static box = "-270 -240 500 500";
  static bases = [[190, -105], [-210, -105], [0, 245]];
  static opacity = 0.2;

  #cube; #groups; #pathes; #convert; #isAnimating
  constructor (element, {sides: [firstFace, secondFace] = []} = {}) {
    if (!(element instanceof Element)) {throw TypeError();}
    if (!(firstFace instanceof CubistFace)) {throw TypeError();}
    if (!(secondFace instanceof CubistFace)) {throw TypeError();}
    const thirdFace = CubistFace.getThirdByTwoFaces(firstFace, secondFace);

    this.#convert = (cordinate) => [
      firstFace.isFront()? cordinate[firstFace.getRotate()]: 1 - cordinate[firstFace.getRotate()],
      secondFace.isFront()? cordinate[secondFace.getRotate()]: 1 - cordinate[secondFace.getRotate()],
      thirdFace.isFront()? cordinate[thirdFace.getRotate()]: 1 - cordinate[thirdFace.getRotate()]
    ];
    
    this.#cube = document.createElementNS(CubistCube.SVGURL, "svg");
    this.#cube.setAttribute("viewBox", CubistCube.box);

    if (element.getAttribute("id") != null) {
      this.#cube.setAttribute("id", element.getAttribute("id"));
    }
    if (element.getAttribute("class") != null) {
      this.#cube.setAttribute("class", [
        element.getAttribute("class"),
        "cube",
        `cube-${firstFace.toString()}${secondFace.toString()}${thirdFace.toString()}`
      ].join(" "));
    } else {
      this.#cube.setAttribute("class", [
        "cube",
        `cube-${firstFace.toString()}${secondFace.toString()}${thirdFace.toString()}`
      ].join(" "));
    }

    this.#cube.style.fill = "dimgray";
    this.#cube.style.stroke = "black";
    this.#cube.style['stroke-width'] = 4;
    this.#cube.style['stroke-linejoin'] = "round";
    this.#cube.style.transition = 500;
    
    element.parentNode.insertBefore(this.#cube, element);
    element.remove();


    this.#groups = {};
    for (let isFront of [false, true]) {
      this.#groups[isFront] = this.#cube.appendChild(document.createElementNS(CubistCube.SVGURL, "g"));
      this.#groups[isFront].setAttribute("class", ["group", `group-${isFront? "front": "back"}`].join(" "));
      if (!isFront) {this.#groups[isFront].style.stroke = "white";}
    }

    this.#pathes = {};
    for (let sticker of CubistSticker.allStickers()) {
      const path = this.#groups[sticker.getFace().isFront()].appendChild(document.createElementNS(CubistCube.SVGURL, "path"));
      // ↑誤り。
      this.#pathes[sticker.getName()] = path;

      const d = CubistCube.digitize(
        sticker.getCordinates()
          .map(cordinate => this.#convert(cordinate))
          .map(cordinate => CubistThreedee.strain(cordinate, CubistCube.strainConstant))
          .map(cordinate => CubistThreedee.linear(cordinate, CubistCube.bases)
            .map(value => Math.round(value))
          )
      );
      path.setAttribute("d", d);

      path.setAttribute("class", `sticker sticker-${sticker.getName()}`);
    }
  }

  getColors () {
    let colors = {};
    for (let sticker of CubistSticker.allStickers()) {
      colors[sticker.getName()] = this.#pathes[sticker.getName()].style.fill;
    }
    return colors;
  }
  setColors (colors) {
    for (let stickerId in colors) {
      this.#pathes[stickerId].style.fill = colors[stickerId];
    }
    return this;
  }
  moveColors (move) {
    let colors = {};
    const shift = move.getStickersShift();
    for (let sticker of move.getAffectedStickers()) {
      if (!(Object.keys(this.#pathes).includes(shift[sticker.getName()]))) {
        console.warn("stickerの名前" + sticker.getName() + "に対応したpathが見つかりません。");
        continue;
      }
      colors[sticker.getName()] = this.#pathes[shift[sticker.getName()]].style.fill;
    }
    console.groupEnd();
    return this.setColors(colors);
  }
  blackOut (stickers) {
    let colors = {};
    for (let sticker of stickers) {
      colors[sticker.getName()] = "inherit";
    }
    return this.setColors(colors);
  }

  getAnimation (moves, {begin = 50, end = 200, duration = 20, gap = 30, repeatCount = 1, fill = "remove"} = {}) {

    const intro = ({count = 0, origin = null, repeat = (repeatCount == "indefinite"? repeatCount: repeatCount - 1)} = {}) => {
      if (count == 0) {
        if (this.#isAnimating) {
          console.error("stop init animate because another animation is moving.");
          return;
        }
        else {
          this.#isAnimating = true;
        }
      }
      if (origin == null) {
        origin = this.getColors();
      }

      if (count < begin) {
        requestAnimationFrame(() => intro({count: count + 1, origin, repeat}))
      }
      else {
        if (moves.length != 0) {
          requestAnimationFrame(() => step({phase: 0, origin, repeat}));
        } else {
          requestAnimationFrame(() => outro({origin, repeat}));
        }
      }

    };

    const step = ({count = 0, phase = 0, prev = null, origin = null, repeat} = {}) => {
      if (prev == null) {
        prev = this.getColors();
      }

      if (count < ((Math.abs(moves[phase].getTimes()) < 2)? duration: duration*2)) {
        this.spin(moves[phase], count/duration*90);
        
        requestAnimationFrame(() => step({count: count + 1, phase, prev, origin, repeat}));
      }
      else {
        this.spin(moves[phase], 0);
        this.moveColors(moves[phase]);
        
        requestAnimationFrame(() => wait({phase, origin, repeat}));
      }
    };

    const wait = ({count = 0, phase, origin = null, repeat} = {}) => {
      if (count < gap) {
        requestAnimationFrame(() => wait({phase: phase, count: count + 1, origin, repeat}));
      } else {
        if ((phase + 1) < moves.length) {
          requestAnimationFrame(() => step({phase: phase + 1, origin, repeat}));
        }
        else {
          requestAnimationFrame(() => outro({origin, repeat}));
        }
      }
    };

    const outro = ({count = 0, origin = null, repeat} = {}) => {
      if (count < end) {
        requestAnimationFrame(() => outro({count: count + 1, origin, repeat}));
      }
      else {
        this.#isAnimating = false;
        if (repeat == "indefinite" || repeat > 0) {
          this.setColors(origin);
          requestAnimationFrame(() => intro({count: 0, repeat: ((repeat == "indefinite")? repeat: repeat - 1)}));
        }
        else {
          if (fill == "remove") {
            this.setColors(origin);
          }
        }
      }
    };

    return intro;
  }
  spin (move, degree) {
    const direction = CubistThreedee.rotate([1, 0, 0], move.getAxis());

    for (let sticker of move.getAffectedStickers()) {
      const path = this.#pathes[sticker.getName()];

      const d = CubistCube.digitize(
        sticker.getCordinates()
          .map(cordinate => CubistThreedee.spin(
            cordinate,
            [1/2, 1/2, 1/2],
            direction,
            degree*(move.getTimes() > 0? 1: -1)
          ))
          .map(cordinate => this.#convert(cordinate))
          .map(cordinate => CubistThreedee.strain(cordinate, CubistCube.strainConstant))
          .map(cordinate => CubistThreedee.linear(cordinate, CubistCube.bases)
            .map(value => Math.round(value))
          )
      );
      path.setAttribute("d", d);
    }
  }


  static makeCube (element, {sides: [firstFace = "f", secondFace = "r"] = []} = {}) {
    if (typeof firstFace == "function") {firstFace = firstFace(element);}
    if (typeof secondFace == "function") {secondFace = secondFace(element);}

    return new CubistCube(element, {
      sides: [
        CubistFace.getFaceByName(firstFace),
        CubistFace.getFaceByName(secondFace)
      ]
    });
  }
  static makeCubeById (id, option = {}) {
    const preElement = document.getElementById(id);
    if (preElement == null) {throw Error();}
    return CubistCube.makeCube(preElement, option);
  }
  static *makeCubesByClassName (className, option = {}) {
    const preElements = document.getElementsByClassName(className);
    if (preElements == null) {throw Error();}
    for (let preElement of preElements) {
      yield CubistCube.makeCube(preElement, option);
    }
  }

  setColorsByDictionary (colorDictionary) {
    let colors = {};
    for (let [stikcerName, color] of Object.entries(colorDictionary)) {
      colors[CubistSticker.getStickerByName(stikcerName).getName()] = color;
    }
    return this.setColors(colors);
  }
  fullColors () {
    return this.fullColorsByDictionary({"f": "red", "r": "limegreen", "u": "yellow" ,"b": "orange", "l": "blue", "d": "white"});
  }
  fullColorsByDictionary (faceColors) {
    let colors = {};
    for (let [faceName, color] of Object.entries(faceColors)) {
      for (let sticker of CubistSticker.allStickersOnFace(CubistFace.getFaceByName(faceName))) {
        colors[sticker.getName()] = color;
    } }
    return this.setColors(colors);
  }
  blackOutByFace (...faceNames) {
    for (let faceName of faceNames) {
      this.blackOut([...CubistSticker.allStickersOnFace(CubistFace.getFaceByName(faceName))]);
    }
    return this;
  }
  blackOutBySticker (...stickerNames) {
    let stickers = [];
    for (let stickerName of stickerNames) {
      stickers.push(CubistSticker.getStickerByName(stickerName));
    }
    return this.blackOut(stickers);
  }
  blackOutByMove (...movetexts) {
    for (let move of CubistMovrackets.makeMovracketsFromText(movetexts.join("")).linise().toArray()) {
      this.blackOut([...move.getAffectedStickers()]);
    }
    return this;
  }
  moveColorsByMovetext (movetext, reversed = false) {
    let moves = CubistMovrackets.makeMovracketsFromText(movetext);
    if (reversed) {moves = moves.exponent(-1);}
    moves = moves.linise().toArray();
    for (let move of moves) {
      this.moveColors(move);
    }
  }
  setClear (clear = true) {
    if (clear) {this.#groups[true].style.opacity = CubistCube.opacity;}
    else {this.#groups[true].style.opacity = 1;}
    return this;
  }
  getAnimationByMovetext (movetext, option = {}) {
    return this.getAnimation([...CubistMovrackets.makeMovracketsFromText(movetext).linise().toArray()], option);
  }

  static digitize (cordinates) {
    return 'M' + cordinates.map(cordinate => cordinate.join(',')).join(' L') + ' Z';
  }
  asElement () {
    return this.#cube;
  }
}


class CubistMove {
  #axis; #width; #start; #times;
  constructor ({axis, width, start, times}) {
    if (times == undefined) {throw TypeError()}
    this.#axis = axis;
    this.#width = width;
    this.#start = start;
    this.#times = times;
  }

  getAxis () {
    return this.#axis;
  }
  getTimes () {
    return this.#times;
  }

  exponent (exponent) {
    const finallyExponent = this.#times * exponent;
    return new CubistMove({axis: this.#axis, width: this.#width, start: this.#start, times: (finallyExponent<0? -1: 1) * ({0: 0, 1: 1, 2: 2, 3: -1}[Math.abs(finallyExponent)%4])});
  }

  *getAffectedStickers () {
    const on = new CubistFace({isFront: true, rotate: this.#axis});
    const off = new CubistFace({isFront: false, rotate: this.#axis});
    
    for (let depth = this.#start; depth < this.#start + this.#width; depth++) {

      if (depth == 0) {
        yield* CubistSticker.allStickersOnFace(on);
        yield* CubistSticker.allStickersNextFace(on);
      }

      else if (depth == 1) {
        yield* CubistSticker.allStickersBetweenFaces(on, off);
      }

      else {
        yield* CubistSticker.allStickersOnFace(off);
        yield* CubistSticker.allStickersNextFace(off);
      }
    }
  }
  getStickersShift () {
    const on = {
      true: new CubistFace({isFront: true, rotate: this.#axis}),
      false: new CubistFace({isFront: false, rotate: this.#axis})
    };
    let shift = {};

    for (let depth = 0; depth < 3; depth++) {
      if (depth == 0 || depth == 2) {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            shift[CubistSticker.getStickerByTwoFaces(
              on[depth == 0],
              on[depth == 0].getSides()[0], i,
              on[depth == 0].getSides()[1], j,
            ).getName()] = CubistSticker.getStickerByTwoFaces(
              on[depth == 0],
              on[depth == 0].getSides()[(this.#times+4)%4], i,
              on[depth == 0].getSides()[(this.#times+1+4)%4], j,
            ).getName();
        } } 
      }

      for (let g = 0; g < 4; g++) {
        for (let k = 0; k < 3; k++) {
          shift[CubistSticker.getStickerByTwoFaces(
            on[true].getSides()[g],
            on[true], depth,
            on[true].getSides()[(g+1)%4], k,
          ).getName()] = CubistSticker.getStickerByTwoFaces(
            on[true].getSides()[(g+this.#times+4)%4],
            on[true], depth,
            on[true].getSides()[(g+this.#times+1+4)%4], k,
          ).getName();
      } }
    }

    return shift;
  }

  static makeMoveFromText (text) {
    return new CubistMove({
      axis: (new RegExp("[FBSz]").test(text))? 0: ((new RegExp("[RLMx]").test(text))? 1: 2),
      width: (new RegExp("[xyz]").test(text))? 3: ((new RegExp("w").test(text))? 2: 1),
      start: (new RegExp("[FRUxyz]").test(text))? 0: ((new RegExp("([BLD]w|[SME])").test(text))? 1: 2),
      times: ((new RegExp("[BLDSM]").test(text))? -1: 1) * (new RegExp("'").test(text)? -1: 1) * (new RegExp("2").test(text)? 2: 1)
    });
  }
  toString () {
    if (this.#width == 1) {
      return `${[["F","S","B"],["R","M","L"],["U","E","D"]][this.#axis][this.#start]}${{"-1":"'","1":""}[((this.#start==2)? -1: 1) * ((this.#times<0)? -1: 1)]}${(Math.abs(this.#times)==2)? "2": ""}`;
    } else if (this.#width == 2) {
      return `${[["F","B"],["R","L"],["U","D"]][this.#axis][this.#start]}w${{"-1":"'","1":""}[((this.#start==1)? -1: 1) * ((this.#times<0)? -1: 1)]}${(Math.abs(this.#times)==2)? "2": ""}`;
    } else {
      return `${["z","x","y"][this.#axis]}${{"-1":"'","1":""}[(this.#times<0)? -1: 1]}${(Math.abs(this.#times)==2)? "2": ""}`;
    }
  }
}
class CubistNbracket {
  #left; #right; #exponent;
  constructor ({left, right, exponent}) {
    if (!(left instanceof CubistMovrackets)) {throw TypeError();}
    if (!(right instanceof CubistMovrackets)) {throw TypeError();}
    this.#left = left;
    this.#right = right;
    this.#exponent = exponent;
  }

  exponent (exponent) {
    return new CubistNbracket({left: this.#left, right: this.#right, exponent: this.#exponent * exponent});
  }

  toIbracket () {
    return new CubistIbracket({
      line: new CubistMovrackets({movrackets: [new CubistIbracket({line: this.#left, exponent: 1}), new CubistIbracket({line: this.#right, exponent: 1}), new CubistIbracket({line: this.#left, exponent: -1}), new CubistIbracket({line: this.#right, exponent: -1})]}),
      exponent: this.#exponent
    });
  }

  innerMinusExponent () {
    if (this.#exponent < 0) {
      return new CubistNbracket({left: this.#right.exponent(-1), right: this.#left.exponent(-1), exponent: this.#exponent * -1});
    } else {
      return new CubistNbracket({left: this.#left, right: this.#right, exponent: this.#exponent});
    }
  }
  linise ({depth = 0} = {}) {
    return this.toIbracket().linise({depth});
  }
  
  applyFunctionToMovracket (func) {
    return new CubistNbracket({left: func(this.#left), right: func(this.#right) , exponent: this.#exponent});
  }

  toString () {
    return `[${this.#left.toString()}, ${this.#right.toString()}]${this.#exponent<0? "'": ""}${Math.abs(this.#exponent)!=1? Math.abs(this.#exponent): ""}`;
  }
}
class CubistVbracket {
  #left; #right; #exponent;
  constructor ({left, right, exponent}) {
    if (!(left instanceof CubistMovrackets)) {throw TypeError();}
    if (!(right instanceof CubistMovrackets)) {throw TypeError();}
    this.#left = left;
    this.#right = right;
    this.#exponent = exponent;
  }

  exponent (exponent) {
    return new CubistVbracket({left: this.#left, right: this.#right, exponent: this.#exponent * exponent});
  }

  toIbracket () {
    return new CubistIbracket({
      line: new CubistMovrackets({movrackets: [new CubistIbracket({line: this.#left, exponent: 1}), new CubistIbracket({line: this.#right, exponent: 1}), new CubistIbracket({line: this.#left, exponent: -1})]}),
      exponent: this.#exponent
    });
  }

  innerMinusExponent () {
    if (this.#exponent < 0) {
      return new CubistVbracket({left: this.#left, right: this.#right.exponent(-1), exponent: this.#exponent * -1});
    } else {
      return new CubistVbracket({left: this.#left, right: this.#right, exponent: this.#exponent});
    }
  }
  linise ({depth = 0} = {}) {
    return this.toIbracket().linise({depth});
  }
  
  applyFunctionToMovracket (func) {
    return new CubistVbracket({left: func(this.#left), right: func(this.#right) , exponent: this.#exponent});
  }

  toString () {
    return `{${this.#left.toString()}, ${this.#right.toString()}}${this.#exponent<0? "'": ""}${Math.abs(this.#exponent)!=1? Math.abs(this.#exponent): ""}`;
  }
}
class CubistIbracket {
  #line; #exponent;
  constructor ({line, exponent}) {
    if (!(line instanceof CubistMovrackets)) {throw TypeError();}
    this.#line = line;
    this.#exponent = exponent;
  }

  exponent (exponent) {
    return new CubistIbracket({line: this.#line, exponent: this.#exponent * exponent});
  }

  isMinimum () {
    return this.#line.length == 1;
  }
  outerLine () {
    return this.#line.exponent(this.#exponent);
  }

  innerMinusExponent () {
    if (this.#exponent < 0) {
      return new CubistIbracket({line: this.#line.exponent(-1), exponent: this.#exponent * -1});
    } else {
      return new CubistIbracket({line: this.#line, exponent: this.#exponent});
    }
  }
  linise ({depth = 0} = {}) {
    return this.#line.exponent(this.#exponent).linise({depth});
  }

  applyFunctionToMovracket (func) {
    return new CubistIbracket({line: func(this.#line), exponent: this.#exponent});
  }

  toString () {
    return `(${this.#line.toString()})${this.#exponent<0? "'": ""}${Math.abs(this.#exponent)!=1? Math.abs(this.#exponent): ""}`;
  }
}
class CubistMovrackets {
  #movrackets;
  constructor ({movrackets = []} = {}) {
    movrackets.map(movracket => {if (!(movracket instanceof CubistMove || movracket instanceof CubistNbracket || movracket instanceof CubistVbracket || movracket instanceof CubistIbracket)) {throw TypeError();}})
    this.#movrackets = movrackets;
  }

  push (movracket) {
    if (!(movracket instanceof CubistMove || movracket instanceof CubistNbracket || movracket instanceof CubistVbracket || movracket instanceof CubistIbracket)) {throw TypeError();}
    this.#movrackets.push(movracket);
  }
  concat (...movracketss) {
    for (let movrackets of movracketss) {
      for (let movracket of movrackets.toArray()) {
        this.push(movracket);
      }
    }
  }
  static concat (...movracketss) {
    return new CubistMovrackets().concat([movracketss]);
  }

  get length () {
    return this.#movrackets.length;
  }
  *toArray () {
    yield* this.#movrackets;
  }

  exponent (exponent) {
    let movrackets = new CubistMovrackets();
    for (let time = 0; time < Math.abs(exponent); time++) {
      if (exponent > 0) {
        for (let i = 0; i < this.#movrackets.length; i++) {
          movrackets.push(this.#movrackets[i]);
        }
      } else {
        for (let i = this.#movrackets.length - 1; i >= 0; i--) {
          movrackets.push(this.#movrackets[i].exponent(-1));
        }
      }
    }
    return movrackets;
  }

  simplize () {
    return this
      .iriseNVbrackets()
      .innerMinusExponent()
      .spliceMinimumIbracket()
      .spliceMostOutsideIbracket()
      .linise({depth: 1});
  }

  spliceMostOutsideIbracket () {
    if (this.#movrackets.length == 1 && (this.#movrackets[0] instanceof CubistIbracket)) {
      return this.#movrackets[0].outerLine();
    } else {
      return this;
    }
  }
  spliceMinimumIbracket () {
    let movrackets = new CubistMovrackets();
    for (let movracket of this.#movrackets) {
      if (movracket instanceof CubistNbracket || movracket instanceof CubistVbracket) {
        movrackets.push(movracket.applyFunctionToMovracket(CubistMovrackets.spliceMinimumIbracket));
      }
      else if (movracket instanceof CubistIbracket && movracket.isMinimum()) {
        movrackets.concat(movracket.applyFunctionToMovracket(CubistMovrackets.spliceMinimumIbracket).outerLine());
      }
      else if (movracket instanceof CubistIbracket) {
        movrackets.push(movracket.applyFunctionToMovracket(CubistMovrackets.spliceMinimumIbracket));
      }
      else if (movracket instanceof CubistMove) {
        movrackets.push(movracket);
      }
    }
    return movrackets;
  }
  static spliceMinimumIbracket (argumentMovrackets) {
    return argumentMovrackets.spliceMinimumIbracket();
  }
  innerMinusExponent () {
    let movrackets = new CubistMovrackets();
    for (let movracket of this.#movrackets) {
      if (movracket instanceof CubistNbracket || movracket instanceof CubistVbracket || movracket instanceof CubistIbracket) {
        movrackets.push(movracket.innerMinusExponent().applyFunctionToMovracket(CubistMovrackets.innerMinusExponent));
      }
      else if (movracket instanceof CubistMove) {
        movrackets.push(movracket);
      }
    }
    return movrackets;
  }
  static innerMinusExponent (argumentMovrackets) {
    return argumentMovrackets.innerMinusExponent();
  }
  iriseNVbrackets () {
    let movrackets = new CubistMovrackets();
    for (let movracket of this.#movrackets) {
      if (movracket instanceof CubistNbracket || movracket instanceof CubistVbracket) {
        movrackets.push(movracket.applyFunctionToMovracket(CubistMovrackets.iriseNVbrackets).toIbracket());
      }
      else if (movracket instanceof CubistIbracket) {
        movrackets.push(movracket.applyFunctionToMovracket(CubistMovrackets.iriseNVbrackets));
      }
      else if (movracket instanceof CubistMove) {
        movrackets.push(movracket);
      }
    }
    return movrackets;
  }
  static iriseNVbrackets (argumentMovrackets) {
    return argumentMovrackets.iriseNVbrackets();
  }
  linise ({depth = 0} = {}) {
    if (depth > 0) {
      return this;
    }
    else {
      let movrackets = new CubistMovrackets();
      for (let movracket of this.#movrackets) {
        if (movracket instanceof CubistNbracket || movracket instanceof CubistVbracket || movracket instanceof CubistIbracket) {
          movrackets.concat(movracket.linise({depth: depth - 1}));
        }
        else if (movracket instanceof CubistMove) {
          movrackets.push(movracket);
        }
      }
      return movrackets;
    }
  }

  static makeMovracketsFromText (text, {original = text, relative = 0} = {}) {
    let characters = text.split("");
    let movrackets = new CubistMovrackets();
    let i = 0;

    const mark = (text, indexs) => {
      let result = text;
      for (let i in indexs) {
        result = result.slice(0,indexs[i]+Number(i)) + "^" + result.slice(indexs[i]+Number(i),indexs[i]+Number(i)+1) + "^" + result.slice(indexs[i]+Number(i)+1);
      }
      return result;
    };

    while (i < characters.length) {
      if (new RegExp("[FRUBLD]").test(characters[i])) {
        let move = characters[i];

        i++;
        if (new RegExp("w").test(characters[i])) {
          move += characters[i];
          i++;
        }
        if (new RegExp("'").test(characters[i])) {
          move += characters[i];
          i++;
        }
        if (new RegExp("2").test(characters[i])) {
          move += characters[i];
          i++;
        }

        movrackets.push(CubistMove.makeMoveFromText(move));
      }
      else if (new RegExp("[SMExyz]").test(characters[i])) {
        let move = characters[i];

        i++;
        if (new RegExp("'").test(characters[i])) {
          move += characters[i];
          i++;
        }
        if (new RegExp("2").test(characters[i])) {
          move += characters[i];
          i++;
        }

        movrackets.push(CubistMove.makeMoveFromText(move));
      }
      else if (new RegExp("[\[]").test(characters[i])) {
        const leftIndex = i;
        let left = "";
        let right = "";
        let depth = 0;

        i++
        while (true) {
          if (depth == 0 && new RegExp(",").test(characters[i])) {
            i++;
            break;
          }
          else if (new RegExp("[[{(]").test(characters[i])) {
            depth += 1;
          }
          else if (new RegExp("[\\]})]").test(characters[i])) {
            depth -= 1;
          }

          left += characters[i];
          i++;
          if (i >= characters.length) {
            throw SyntaxError(`same depth "," is not found after "[". (full text = "${mark(original, [relative+leftIndex])}")`);
          }
        }
        const midIndex = i;
        while (true) {
          if (depth == 0 && new RegExp("]").test(characters[i])) {
            i++;
            break;
          }
          else if (new RegExp("[[{(]").test(characters[i])) {
            depth += 1;
          }
          else if (new RegExp("[\\]})]").test(characters[i])) {
            depth -= 1;
          }

          right += characters[i];
          i++;
          if (i >= characters.length) {
            throw SyntaxError(`same depth "]" is not found after "[" & ",". (full text = "${mark(original, [relative+leftIndex, relative+midIndex])}")`);
          }
        }

        let exponent = 1;
        if (new RegExp("'").test(characters[i])) {
          exponent = -1;
          i++;
        }
        if (new RegExp("[2-9]").test(characters[i])) {
          exponent = exponent * characters[i]
          i++;
          while (new RegExp("[0-9]").test(characters[i])) {
            exponent = 10 * exponent + characters[i]
            i++;
          }
        }

        movrackets.push(new CubistNbracket({
          left: this.makeMovracketsFromText(left),
          right: this.makeMovracketsFromText(right),
          exponent
        }));
      }
      else if (new RegExp("{").test(characters[i])) {
        const leftIndex = i;
        let left = "";
        let right = "";
        let depth = 0;

        i++
        while (true) {
          if (depth == 0 && new RegExp(",").test(characters[i])) {
            i++;
            break;
          }
          else if (new RegExp("[[{(]").test(characters[i])) {
            depth += 1;
          }
          else if (new RegExp("[\\]})]").test(characters[i])) {
            depth -= 1;
          }

          left += characters[i];
          i++;
          if (i >= characters.length) {
            throw SyntaxError(`same depth "," is not found after "{". (full text = "${mark(original, [relative+leftIndex])}")`);
          }
        }
        const midIndex = i;
        while (true) {
          if (depth == 0 && new RegExp("}").test(characters[i])) {
            i++;
            break;
          }
          else if (new RegExp("[[{(]").test(characters[i])) {
            depth += 1;
          }
          else if (new RegExp("[\\]})]").test(characters[i])) {
            depth -= 1;
          }

          right += characters[i];
          i++;
          if (i >= characters.length) {
            throw SyntaxError(`same depth "}" is not found after "{" & ",". (full text = "${mark(original, [relative+leftIndex, relative+midIndex])}")`);
          }
        }

        let exponent = 1;
        if (new RegExp("'").test(characters[i])) {
          exponent = -1;
          i++;
        }
        if (new RegExp("[2-9]").test(characters[i])) {
          exponent = exponent * characters[i]
          i++;
          while (new RegExp("[0-9]").test(characters[i])) {
            exponent = 10 * exponent + characters[i]
            i++;
          }
        }

        movrackets.push(new CubistVbracket({
          left: this.makeMovracketsFromText(left),
          right: this.makeMovracketsFromText(right),
          exponent
        }));
      }
      else if (new RegExp("\\(").test(characters[i])) {
        const leftIndex = i;
        let line = "";
        let depth = 0;

        i++
        while (true) {
          if (depth == 0 && new RegExp("\\)").test(characters[i])) {
            i++;
            break;
          }
          else if (new RegExp("[[{(]").test(characters[i])) {
            depth += 1;
          }
          else if (new RegExp("[\\]})]").test(characters[i])) {
            depth -= 1;
          }

          line += characters[i];
          i++;
          if (i >= characters.length) {
            throw SyntaxError(`same depth "," is not found after "{". (full text = "${mark(original, [relative+leftIndex])}")`);
          }
        }

        let exponent = 1;
        if (new RegExp("'").test(characters[i])) {
          exponent = -1;
          i++;
        }
        if (new RegExp("[2-9]").test(characters[i])) {
          exponent = exponent * characters[i]
          i++;
          while (new RegExp("[0-9]").test(characters[i])) {
            exponent = 10 * exponent + characters[i]
            i++;
          }
        }

        movrackets.push(new CubistIbracket({
          line: this.makeMovracketsFromText(line),
          exponent
        }));
      }
      // space
      else if (characters[i] == " ") {
        i++;
      }
      // erroring
      else if (new RegExp("w").test(characters[i])) {
        throw SyntaxError(`syntax "${characters[i]}" position is wrong. restricted [FRUBLD]w?. (full text = "${mark(original, [relative+i])}")`);
      }
      else if (new RegExp("['2]").test(characters[i])) {
        throw SyntaxError(`syntax "${characters[i]}" position is wrong. restricted ([FRUBLD]w?|[SMExyz])'?2?. (full text = "${mark(original, [relative+i])}")`);
      }
      else if (new RegExp("[0-9]").test(characters[i])) {
        throw SyntaxError(`syntax "${characters[i]}" position is wrong. restricted ([~]|{~}|(~))'?([2-9][0-9]*)?. (full text = "${mark(original, [relative+i])}")`);
      }
      else if (new RegExp("[,\\]})]").test(characters[i])) {
        throw SyntaxError(`syntax "${characters[i]}" is declared before "${{"]": "[", "}": "{", ")": "("}[characters[i]]}". (full text = "${mark(original, [relative+i])}")`);
      }
      else {
        throw SyntaxError(`syntax "${characters[i]}" is ANACCEPTABLE. (full text = "${mark(original, [relative+i])}")`);
      }
    }

    return movrackets;
  }
  toString () {
    let text = "";
    for (let movracket of this.#movrackets) {
      text += ` ${movracket.toString()}`;
    }

    return text.slice(1);
  }
}