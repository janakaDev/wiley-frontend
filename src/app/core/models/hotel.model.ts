export class Hotel {
  constructor(
    public  id: number,
    public image_url: string,
    public name: string,
    public location: string,
    public stars: number,
    public description: string,
    public spa: number,
    public pool: number,
    public taxi: number,
  ) {
  }
}
