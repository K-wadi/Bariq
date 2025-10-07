import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical = 'https://bariqautocare.nl',
  ogImage = 'https://bariqautocare.nl/B_logo_bg.png',
  ogType = 'website',
  noindex = false,
}) => {
  const fullTitle = title.includes('Bariq') ? title : `${title} | Bariq Autocare`;
  
  useEffect(() => {
    // Update title
    document.title = fullTitle;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };
    
    // Update canonical link
    let canonical_link = document.querySelector('link[rel="canonical"]');
    if (!canonical_link) {
      canonical_link = document.createElement('link');
      canonical_link.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical_link);
    }
    canonical_link.setAttribute('href', canonical);
    
    // Primary meta tags
    updateMetaTag('title', fullTitle);
    updateMetaTag('description', description);
    
    if (noindex) {
      updateMetaTag('robots', 'noindex,nofollow');
    }
    
    // Open Graph
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:site_name', 'Bariq Autocare', true);
    updateMetaTag('og:url', canonical, true);
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    
    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', canonical);
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
  }, [title, description, canonical, ogImage, ogType, noindex, fullTitle]);
  
  return null;
};

export default SEO;
