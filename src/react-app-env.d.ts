/// <reference types="react-scripts" />

declare module 'simple-react-lightbox' {
    interface SRLWrapperElement {
      src: string;
      caption?: string;
      thumbnail?: string;
      width?: React.ReactText;
      height?: React.ReactText;
      autoplay?: boolean;
      showControls?: boolean;
    }
  
    interface SRLWrapperProps {
      elements?: SRLWrapperElement[];
      options?: Record<string, any>;
    }
  
    const SimpleReactLightbox: React.FC;
    const SRLWrapper: React.FC<SRLWrapperProps>;
  
    export { SRLWrapper };
    export default SimpleReactLightbox;
  }
