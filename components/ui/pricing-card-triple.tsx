'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type AnchorOrButton =
  | ({ href: string; onClick?: never } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ href?: undefined; onClick?: React.MouseEventHandler<HTMLButtonElement> } & React.ButtonHTMLAttributes<HTMLButtonElement>);

type Tone = 'zinc' | 'dark' | 'blue' | 'violet' | 'emerald' | 'red' | 'orange' | 'green';

export type PricingFeature = {
  label: React.ReactNode;
  included?: boolean;
};

export type PricingCardTwoProps = {
  icon?: React.ReactNode;
  name: string;
  subtitle?: string;
  price: number | string;
  currency?: string;
  periodLabel?: string;
  features: PricingFeature[];
  cta?: AnchorOrButton & { label?: string; 'aria-label'?: string };
  tone?: Tone;
  className?: string;
  iconClassName?: string;
  nameClassName?: string;
  subtitleClassName?: string;
  priceClassName?: string;
  periodClassName?: string;
  featureListClassName?: string;
  featureItemClassName?: string;
  ctaClassName?: string;
};

const toneMap: Record<Tone, {
  frame: string;
  accent: string;
  iconAccent?: string;
  btn: string;
  btnHover: string;
  okBg: string;
  okRing: string;
  okFg: string;
  noBg: string;
  noRing: string;
  noFg: string;
  surface: string;
}> = {
  red: {
    frame: 'bg-linear-to-b from-zinc-300 to-zinc-500',
    accent: 'text-zinc-900',
    iconAccent: 'text-rose-400',
    btn: 'bg-zinc-900 text-white',
    btnHover: 'hover:bg-black',
    okBg: 'bg-zinc-100',
    okRing: 'ring-zinc-200',
    okFg: 'text-zinc-600',
    noBg: 'bg-zinc-50',
    noRing: 'ring-zinc-200',
    noFg: 'text-zinc-300',
    surface: 'bg-white ring-zinc-200',
  },
  orange: {
    frame: 'bg-linear-to-b from-zinc-300 to-zinc-500',
    accent: 'text-zinc-900',
    iconAccent: 'text-amber-400',
    btn: 'bg-zinc-900 text-white',
    btnHover: 'hover:bg-black',
    okBg: 'bg-zinc-100',
    okRing: 'ring-zinc-200',
    okFg: 'text-zinc-600',
    noBg: 'bg-zinc-50',
    noRing: 'ring-zinc-200',
    noFg: 'text-zinc-300',
    surface: 'bg-white ring-zinc-200',
  },
  green: {
    frame: 'bg-linear-to-b from-zinc-300 to-zinc-500',
    accent: 'text-zinc-900',
    iconAccent: 'text-emerald-500',
    btn: 'bg-zinc-900 text-white',
    btnHover: 'hover:bg-black',
    okBg: 'bg-zinc-100',
    okRing: 'ring-zinc-200',
    okFg: 'text-zinc-600',
    noBg: 'bg-zinc-50',
    noRing: 'ring-zinc-200',
    noFg: 'text-zinc-300',
    surface: 'bg-white ring-zinc-200',
  },
  blue: {
    frame: 'bg-linear-to-b from-blue-300 to-blue-600',
    accent: 'text-blue-600',
    btn: 'bg-blue-600 text-white',
    btnHover: 'hover:bg-blue-700',
    okBg: 'bg-blue-50',
    okRing: 'ring-blue-200',
    okFg: 'text-blue-500',
    noBg: 'bg-zinc-50',
    noRing: 'ring-zinc-200',
    noFg: 'text-zinc-300',
    surface: 'bg-white ring-blue-100',
  },
  violet: {
    frame: 'bg-linear-to-b from-violet-300 to-violet-600',
    accent: 'text-violet-600',
    btn: 'bg-violet-600 text-white',
    btnHover: 'hover:bg-violet-700',
    okBg: 'bg-violet-50',
    okRing: 'ring-violet-200',
    okFg: 'text-violet-500',
    noBg: 'bg-zinc-50',
    noRing: 'ring-zinc-200',
    noFg: 'text-zinc-300',
    surface: 'bg-white ring-violet-100',
  },
  emerald: {
    frame: 'bg-linear-to-b from-emerald-300 to-emerald-600',
    accent: 'text-emerald-600',
    btn: 'bg-emerald-600 text-white',
    btnHover: 'hover:bg-emerald-700',
    okBg: 'bg-emerald-50',
    okRing: 'ring-emerald-200',
    okFg: 'text-emerald-500',
    noBg: 'bg-zinc-50',
    noRing: 'ring-zinc-200',
    noFg: 'text-zinc-300',
    surface: 'bg-white ring-emerald-100',
  },
  zinc: {
    frame: 'bg-linear-to-b from-zinc-300 to-zinc-500',
    accent: 'text-zinc-900',
    btn: 'bg-[#E8440A] text-white',
    btnHover: 'hover:bg-[#d03d09]',
    okBg: 'bg-orange-50',
    okRing: 'ring-orange-200',
    okFg: 'text-[#E8440A]',
    noBg: 'bg-zinc-50',
    noRing: 'ring-zinc-200',
    noFg: 'text-zinc-300',
    surface: 'bg-white ring-zinc-200',
  },
  dark: {
    frame: 'bg-linear-to-b from-zinc-600 to-[#0a0a0a]',
    accent: 'text-white',
    btn: 'bg-white text-[#0a0a0a]',
    btnHover: 'hover:bg-white/90',
    okBg: 'bg-white/12',
    okRing: 'ring-white/15',
    okFg: 'text-white/80',
    noBg: 'bg-white/5',
    noRing: 'ring-white/8',
    noFg: 'text-white/20',
    surface: 'bg-[#0a0a0a] ring-white/8',
  },
};

function priceParts(price: number | string, currency?: string) {
  if (typeof price === 'number') return { main: `${currency ?? ''}${price}` };
  return { main: price };
}

export default function PricingCardTwo({
  icon,
  name,
  subtitle,
  price,
  currency = '',
  periodLabel,
  features,
  cta,
  tone = 'zinc',
  className,
  iconClassName,
  nameClassName,
  subtitleClassName,
  priceClassName,
  periodClassName,
  featureListClassName,
  featureItemClassName,
  ctaClassName,
}: PricingCardTwoProps) {
  const t = toneMap[tone];
  const pp = priceParts(price, currency);

  return (
    <section aria-label={`${name} plan`} className={cn('relative h-full', className)}>
      <div className={cn('rounded-3xl p-0.75 h-full', t.frame)}>
        <div className={cn('rounded-[22px] px-8 pb-8 pt-10 shadow-sm ring-1 h-full flex flex-col', t.surface)}>

          {icon && (
            <div className={cn('mb-3 grid place-items-center text-5xl text-zinc-400', iconClassName)} aria-hidden>
              {icon}
            </div>
          )}

          <h3 className={cn(
            'text-center text-xl font-semibold',
            tone === 'dark' ? 'text-white' : 'text-zinc-900',
            nameClassName
          )}>
            {name}
          </h3>

          {subtitle && (
            <p className={cn(
              'mt-1 text-center text-sm',
              tone === 'dark' ? 'text-white/40' : 'text-zinc-500',
              subtitleClassName
            )}>
              {subtitle}
            </p>
          )}

          <div className={cn('mt-6 text-center', t.accent, priceClassName)}>
            <span className='text-5xl font-bold leading-none tracking-tight'>{pp.main}</span>
            {periodLabel && (
              <span className={cn(
                'ml-1 text-sm',
                tone === 'dark' ? 'text-white/35' : 'text-zinc-400',
                periodClassName
              )}>
                {periodLabel}
              </span>
            )}
          </div>

          <ul className={cn('mt-6 space-y-2.5 flex-1', featureListClassName)}>
            {features.map((f, i) => {
              const ok = f.included !== false;
              return (
                <li key={i} className={cn(
                  'flex items-start gap-3',
                  tone === 'dark' ? 'text-white/70' : 'text-zinc-700',
                  featureItemClassName
                )}>
                  <span className={cn(
                    'mt-0.5 inline-grid h-6 w-6 shrink-0 place-items-center rounded-full ring-1',
                    ok ? `${t.okBg} ${t.okRing}` : `${t.noBg} ${t.noRing}`
                  )} aria-hidden>
                    {ok ? (
                      <svg viewBox='0 0 20 20' className={cn('h-3.5 w-3.5', t.okFg)} fill='currentColor'>
                        <path d='M16.7 6.3a1 1 0 0 0-1.4-1.4L8 12.2 4.7 8.9a1 1 0 1 0-1.4 1.4L7.3 14a1 1 0 0 0 1.4 0l8-8Z' />
                      </svg>
                    ) : (
                      <svg viewBox='0 0 20 20' className={cn('h-3.5 w-3.5', t.noFg)} fill='currentColor'>
                        <path d='M6.2 5 5 6.2 8.8 10 5 13.8 6.2 15 10 11.2 13.8 15 15 13.8 11.2 10 15 6.2 13.8 5 10 8.8z' />
                      </svg>
                    )}
                  </span>
                  <span className='text-sm leading-relaxed'>{f.label}</span>
                </li>
              );
            })}
          </ul>

          {cta && (
            cta.href ? (
              <a
                href={cta.href}
                aria-label={cta['aria-label'] ?? `Välj ${name}`}
                className={cn(
                  'mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-normal transition-all duration-200',
                  t.btn, t.btnHover, ctaClassName
                )}
              >
                {cta.label ?? 'Kom igång'}
              </a>
            ) : (
              <button
                type='button'
                onClick={(cta as any).onClick}
                aria-label={cta['aria-label'] ?? `Välj ${name}`}
                className={cn(
                  'mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-normal transition-all duration-200',
                  t.btn, t.btnHover, ctaClassName
                )}
              >
                {cta.label ?? 'Kom igång'}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}
