export type IPassedBipa = 'bipa_1' | 'bipa_2' | 'bipa_3' | 'bipa_4' | 'bipa_5' | 'bipa_6' | 'bipa_7'
export enum BipaEnum {
  bipa_1 = '/beginner_bipa-1_card.png',
  bipa_2 = '/beginner_bipa-2_card.png',
  bipa_3 = '/intermediate_bipa-3_card.png',
  bipa_4 = '/intermediate_bipa-4_card.png',
  bipa_5 = '/advanced_bipa-5_card.png',
  bipa_6 = '/advanced_bipa-6-7_card.png',
  bipa_7 = '/advanced_bipa-6-7_card.png',
}

export enum LabelEnum {
  bipa_1 = 'beginner',
  bipa_2 = 'beginner',
  bipa_3 = 'intermediate',
  bipa_4 = 'intermediate',
  bipa_5 = 'advanced',
  bipa_6 = 'advanced',
  bipa_7 = 'advanced',
}

export function replaceUnderscore(str: string) {
  return str.replace(/_/g, '-');
}