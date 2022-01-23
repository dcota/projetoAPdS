/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Author: Duarte Cota
Description: implementation of class Iterator
*/

class Iterator {
    constructor(elements) {
      this.index = 0;
      this.elements = elements;
    }

    first() {
        this.reset()
        return this.elements[this.index]
    }
  
    next() {
      return this.elements[this.index+=1];
    }
  
    hasNext() {
      return this.index < this.elements.length;
    }
    currentItem() {
        return this.elements[this.index]
    }

    reset() {
        this.index = 0
    }

    each(callback) {
        for (var item = this.first(); this.hasNext(); item = this.next()) {
            callback(item);
        }
    }

    size(){
        return this.elements.length
    }
  }
  
  module.exports = {Iterator}