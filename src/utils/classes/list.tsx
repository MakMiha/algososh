export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  getNodeByIndex: (index: number) => T | null;
  insertAt: (element: T, index: number) => void;
  deleteFrom: (index: number) => T | null;
  getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  constructor(initialState?: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    initialState?.forEach(el => this.insertAt(el, 0))
  }

  append(element: T) {
    const node = new Node(element);
    if (this.size === 0) {
      this.head = node;
    } else {
      let curr = this.head;

      while (curr && curr.next !== null) {
        curr = curr.next;
      }

      if (curr) {
        curr.next = node;
      }
    }
    this.size++;
  }

  prepend(element: T) {
      const node = new Node(element);
      this.head = node;
      if (!this.tail) {
        this.tail = node;
      }
      this.size++;
    
  }

  getNodeByIndex(index: number) {
    if (index < 0 || index > this.size) {
      return null;
    }

    let curr = this.head;
    let currIndex = 0;

    while (currIndex < index && curr) {
      curr = curr.next;
      currIndex++;
    }

    return curr ? curr.value : null;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        let prev = null;

        while (currIndex < index && curr) {
          prev = curr;
          curr = curr.next;
          currIndex++;
        }

        if (prev) {
          prev.next = node;
        }
        node.next = curr;
      }

      this.size++;
    }
  }

  deleteFrom(index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return null;
    }

    let curr = this.head;

    if (index === 0 && curr) {
      this.head = curr.next;
    } else {
      let prev = null;
      let currIndex = 0;

      while (currIndex < index && curr) {
        prev = curr;
        curr = curr.next;
        currIndex++;
      }

      if (prev && curr) {
        prev.next = curr.next;
      }
    }

    this.size--;
    return curr ? curr.value : null;
  }

  getSize() {
    return this.size;
  }

}