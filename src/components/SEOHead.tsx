/**
 * SEO 头部组件
 * 用于管理页面的 meta 标签、hreflang、canonical 等 SEO 相关内容
 */
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  noIndex?: boolean;
  /** JSON-LD 结构化数据，传入对象或对象数组 */
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export function SEOHead({
  title,
  description,
  keywords,
  image,
  type = 'website',
  noIndex = false,
  structuredData,
}: SEOHeadProps) {
  const { language } = useApp();
  const location = useLocation();
  
  // 获取当前页面的路径（去除语言前缀）
  const pathWithoutLang = location.pathname.replace(/^\/(zh|en)/, '');
  
  // 构建多语言 URL（使用标准 URL，不使用 hash）
  const baseUrl = 'https://realrealbali.com';
  const currentUrl = `${baseUrl}/${language}${pathWithoutLang}${location.search}`;
  const zhUrl = `${baseUrl}/zh${pathWithoutLang}${location.search}`;
  const enUrl = `${baseUrl}/en${pathWithoutLang}${location.search}`;

  const finalTitle = title || (language === 'zh' ? 'REAL REAL | 巴厘岛房产' : 'REAL REAL | Bali Property');
  const finalDescription = description || (language === 'zh' ? '巴厘岛专业房产中介服务' : 'Professional Bali Property Agency');

  return (
    <Helmet>
      {/* 基础 SEO */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <html lang={language} />

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Hreflang 标签 */}
      <link rel="alternate" hrefLang="zh" href={zhUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={zhUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:locale" content={language === 'zh' ? 'zh_CN' : 'en_US'} />
      <meta property="og:locale:alternate" content={language === 'zh' ? 'en_US' : 'zh_CN'} />
      <meta property="og:site_name" content="REAL REAL" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {image && <meta name="twitter:image" content={image} />}

      {/* JSON-LD 结构化数据 */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(
            Array.isArray(structuredData) ? structuredData : [structuredData]
          )}
        </script>
      )}
    </Helmet>
  );
}
