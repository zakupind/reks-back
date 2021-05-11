import { Injectable } from '@nestjs/common';
import Az from 'az';

@Injectable()
export class SearchService {

  getTokens(text: string) {
    return text.toLowerCase().split(' ')
  }

  getMorghy(text) {
    return new Promise((res, rej) => {
        Az.Morph.init(function () {
            const result = Az.Morph(text);
            res(result);
        });
    })
  }

  async mainFunction(text: string) {
    const tokens = this.getTokens(text);
    const arrayWordsMorphy = [];
    for (const word of tokens) {
      await this.getMorghy(word).then(res => arrayWordsMorphy.push(res))
    }
    console.log(arrayWordsMorphy)
    return arrayWordsMorphy;
  }
}