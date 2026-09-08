import { socialCards } from '../../data/social.js';
import { renderSocialCard } from '../../utils/renderSocialCard.js';

export function getStaticPaths() {
  return socialCards.map(card => ({ params: { id: card.id }, props: { card } }));
}

export async function GET({ props }) {
  const png = await renderSocialCard(props.card);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
