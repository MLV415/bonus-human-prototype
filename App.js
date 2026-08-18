import React, { useMemo, useRef, useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const zukiImage = require('./assets/zuki.png');
const zukiWalkImage = require('./assets/zuki-walk.png');
const peopleImage = require('./assets/haley-ari.png');
const peopleWalkImage = require('./assets/haley-ari-walk.png');
const mikeImage = require('./assets/mike.png');
const jordanImage = require('./assets/jordan.png');
const jordanWalkImage = require('./assets/jordan-walk.png');
const priyaImage = require('./assets/priya.png');
const priyaPorchImage = require('./assets/priya-porch.png');

const C = {
  ink: '#27332D', muted: '#667169', paper: '#FBF8F2', white: '#FFFFFF',
  sage: '#507363', sageLight: '#E8F0EA', clay: '#C86F52', clayLight: '#F7E9E2',
  gold: '#E3B562', line: '#E6E3DC', navy: '#314B5A',
};

const initialProfiles = [
  {
    id: 'haley', role: 'bonus', type: 'BONUS HUMANS', name: 'Haley & Ari', location: 'North Portland · 2.4 mi', distance: 2.4, image: peopleImage,
    photos: [peopleImage, peopleWalkImage],
    intro: 'Homebody adventurers hoping to become trusted aunties to a small dog nearby.',
    looking: 'A steady, long-term connection — weeknight hangs and occasional weekends.',
    highlights: ['Senior-dog experience', 'Quiet home', 'Free Thu evenings'],
    attributes: { Location: ['2.4 miles away', 'North Portland'], Availability: ['Thursday evenings', 'Weekends'], Experience: ['Senior pets', 'Rescue volunteer'], 'Home environment': ['Apartment', 'No yard', 'Quiet home'] },
    filterData: { schedule: ['Thursday PM', 'Saturday PM', 'Sunday PM'], experience: ['Senior dog care', 'Medication / pills', 'Special diets'], home: ['Apartment', 'No yard'] },
    facts: [
      ['Our pet experience', 'Haley grew up with terriers; Ari volunteered with senior rescues for three years.'],
      ['Why this connection', 'We miss the everyday companionship of a dog and want to invest in one bond, not rotate through pet-sitting gigs.'],
      ['Why no pet right now', 'Our lease and travel rhythm make full-time ownership a poor fit, but regular local time feels sustainable.'],
      ['Availability', 'Thursday evenings, one weekend afternoon most weeks, and occasional overnights after trust is built.'],
      ['The connection we hope for', 'A familiar dog who is genuinely excited to see us — and people we can communicate openly with.'],
    ],
    prompts: [['A small joy', 'Slow neighborhood walks with a coffee.'], ['We are known for', 'Following instructions and sending excellent photo updates.']],
  },
  {
    id: 'mike', role: 'owner', type: 'PET OWNER', name: 'Mike + Zuki', location: 'Alberta Arts · 3.1 mi', distance: 3.1, image: mikeImage,
    photos: [mikeImage, zukiImage, zukiWalkImage],
    intro: 'Zuki’s Pet Owner for 16 years. Thoughtful, direct, and looking to thoughtfully grow her Pet Circle.',
    looking: 'Someone patient who values a lasting bond with a gentle senior dog.',
    highlights: ['Senior dog', 'Low-key visits', 'Clear care plan'],
    attributes: { Location: ['3.1 miles away', 'Alberta Arts'], Availability: ['Thursday evenings', 'Weekends'], Experience: ['Senior pet household'], 'Home environment': ['Apartment', 'No yard'] },
    filterData: { schedule: ['Thursday PM', 'Saturday AM', 'Saturday PM', 'Sunday AM'], experience: ['Senior dog care', 'Medication / pills', 'Mobility assistance'], home: ['Apartment', 'No yard'] },
    facts: [
      ['About us', 'Zuki and I are a quiet little household. She has been my constant companion since she was a puppy.'],
      ['Why a bonus human', 'I want Zuki to have another safe, loving connection — not simply backup care when I am busy.'],
      ['Ideal arrangement', 'One regular evening each week, with flexibility for relaxed weekends once everyone is comfortable.'],
      ['What matters most', 'Patience, reliability, and noticing Zuki’s cues. Her comfort always sets the pace.'],
    ],
    prompts: [['Zuki will win you over with', 'Her tiny “welcome home” parade.'], ['Green flag', 'You ask questions and never rush a nervous animal.']],
  },
  {
    id: 'jordan', role: 'bonus', type: 'BONUS HUMAN', name: 'Jordan', location: 'Sellwood · 6.8 mi', distance: 6.8, image: jordanImage,
    photos: [jordanImage, jordanWalkImage],
    intro: 'A former lab parent who misses having a dog-shaped reason to get outside.',
    looking: 'A friendly adult dog for regular weekend walks and low-key visits.',
    highlights: ['Large-dog experience', 'Fenced yard', 'Weekend mornings'],
    attributes: { Location: ['6.8 miles away', 'Sellwood'], Availability: ['Weekend mornings'], Experience: ['General pet care', 'Large dogs'], 'Home environment': ['House', 'Fenced yard'] },
    filterData: { schedule: ['Friday PM', 'Saturday AM', 'Sunday AM'], experience: ['Puppy care', 'Behavioral needs'], home: ['House', 'Yard'] },
    facts: [['Our pet experience', 'Twelve years caring for an easygoing lab mix.'], ['Why this connection', 'I miss the rhythm of walks and companionship without being ready to adopt again.'], ['Why no pet right now', 'I travel for work several times each quarter.'], ['Availability', 'Saturday and Sunday mornings, plus some Friday evenings.'], ['The connection we hope for', 'One nearby dog and household I can know well over time.']],
    prompts: [['Perfect Saturday', 'A long walk, a good sandwich, and a nap.'], ['Green flag', 'Clear expectations and a pet-first pace.']],
  },
  {
    id: 'priya', role: 'owner', type: 'PET OWNER', name: 'Priya + Mochi', location: 'Kenton · 5.6 mi', distance: 5.6, image: priyaImage,
    photos: [priyaImage, priyaPorchImage],
    intro: 'A relaxed household with Mochi, a social five-year-old terrier who loves company.',
    looking: 'A nearby bonus human for weekend adventures and a familiar weeknight hang.',
    highlights: ['Adult terrier', 'Fenced yard', 'Flexible weekends'],
    attributes: { Location: ['5.6 miles away', 'Kenton'], Availability: ['Weekdays', 'Weekends'], Experience: ['First-time friendly'], 'Home environment': ['House', 'Fenced yard'] },
    filterData: { schedule: ['Wednesday PM', 'Saturday AM', 'Sunday AM'], experience: ['Separation anxiety', 'Behavioral needs'], home: ['House', 'Yard', 'Has cats'] },
    facts: [['About us', 'Mochi is playful outside and a champion lounger at home.'], ['Why a bonus human', 'He thrives when his circle is small, familiar, and consistent.'], ['Ideal arrangement', 'One or two visits a week after a gradual introduction.'], ['What matters most', 'Warm communication and following through on plans.']],
    prompts: [['Mochi’s signature move', 'Bringing you one sock as a formal greeting.'], ['Our pace', 'Slow introductions, then wholehearted friendship.']],
  },
];

const careSections = [
  ['Today’s routine', '8:00 AM breakfast + medicine\n12:30 PM short sniff walk\n5:30 PM dinner\n9:30 PM final bathroom break'],
  ['Food', '⅓ cup senior kibble, softened with warm water. Add 1 tsp pumpkin. No table scraps.'],
  ['Medication', 'Heart tablet: ½ pill with breakfast\nJoint chew: 1 with dinner\nTap “Done” in the routine after giving.'],
  ['Bathroom', 'Take her out after meals and before bed. She may circle near the door when she needs to go.'],
  ['Behavior & comfort', 'Approach slowly from the front—her hearing is limited. Avoid stairs. She settles best with her tan blanket nearby.'],
  ['Emergency contacts', 'Mike (primary): 503-555-0142\nHaley: 503-555-0188\nEmergency clinic: 503-555-0199'],
  ['Veterinary information', 'Rose City Veterinary Care\n1840 NE Cedar Ave\nDr. Lena Ortiz · Zuki is on file'],
];

function Button({ label, onPress, tone = 'primary', small = false, disabled = false }) {
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, styles[`button_${tone}`], small && styles.buttonSmall, pressed && !disabled && { opacity: .76 }, disabled && { opacity: .45 }]}>
    <Text style={[styles.buttonText, styles[`buttonText_${tone}`]]}>{label}</Text>
  </Pressable>;
}

function Pill({ children, warm = false }) { return <View style={[styles.pill, warm && styles.pillWarm]}><Text style={[styles.pillText, warm && { color: C.clay }]}>{children}</Text></View>; }
function SectionTitle({ eyebrow, title, right }) { return <View style={styles.sectionTitle}><View style={styles.sectionTitleCopy}><Text style={styles.eyebrow}>{eyebrow}</Text><Text style={styles.h2}>{title}</Text></View>{right}</View>; }
function StatusLabel({ children, tone = 'neutral' }) { return <View style={[styles.statusLabel, styles[`statusLabel_${tone}`]]}><Text style={[styles.statusLabelText, styles[`statusLabelText_${tone}`]]}>{children}</Text></View>; }

function TopBar({ title = 'bonus human', back, onBack, onAccount, action }) {
  return <View style={styles.topBar}>
    {back ? <Pressable accessibilityLabel="Go back" onPress={onBack} hitSlop={12}><Text style={styles.back}>‹</Text></Pressable> : <View style={styles.brandMark}><Text style={styles.brandMarkText}>B</Text></View>}
    <Text style={styles.topTitle}>{title}</Text>
    <View style={styles.topAction}>{action || (onAccount ? <Pressable accessibilityLabel="Open account" onPress={onAccount} style={styles.avatarMini}><Text style={styles.avatarMiniText}>M</Text></Pressable> : null)}</View>
  </View>;
}

function PhotoGallery({ photos, style }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const move = () => setPhotoIndex((photoIndex + 1) % photos.length);
  return <View style={styles.gallery}>
    <Pressable accessibilityRole="button" accessibilityLabel="Next photo" onPress={move}><Image source={photos[photoIndex]} style={style} /></Pressable>
    {photos.length > 1 && <View accessibilityLabel={`Photo ${photoIndex + 1} of ${photos.length}`} style={styles.galleryPosition}>{photos.map((_, i) => <View key={i} style={[styles.galleryDot, i === photoIndex && styles.galleryDotActive]} />)}</View>}
  </View>;
}

function FilterChip({ label, accessibilityLabel, selected, onPress }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel || label} accessibilityState={{ selected }} onPress={onPress} style={[styles.filterChip, selected && styles.filterChipActive]}><Text style={[styles.filterChipText, selected && styles.filterChipTextActive]}>{label}</Text></Pressable>;
}

const DEFAULT_FILTERS = { radius: 10, schedule: [], experience: [], home: [] };
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const EXPERIENCE_OPTIONS = ['Puppy care', 'Senior dog care', 'Medication / pills', 'Injections / shots', 'Special diets', 'Mobility assistance', 'Separation anxiety', 'Behavioral needs'];
const HOME_OPTIONS = ['Apartment', 'House', 'Yard', 'No yard', 'Has dogs', 'Has cats'];

function DistanceSlider({ value, onChange }) {
  const [width, setWidth] = useState(1);
  const [left, setLeft] = useState(0);
  const trackRef = useRef(null);
  const updateFromTouch = event => {
    const pageX = event.nativeEvent.pageX;
    const x = Math.max(0, Math.min(width, pageX == null ? (event.nativeEvent.locationX || 0) : pageX - left));
    onChange(Math.round(1 + (x / width) * 99));
  };
  const adjust = direction => onChange(Math.max(1, Math.min(100, value + direction * 10)));
  const percentage = ((value - 1) / 99) * 100;
  return <View style={styles.distanceBlock}>
    <View style={styles.distanceHeader}><Text style={styles.factTitle}>Distance / radius</Text><Text style={styles.distanceValue}>{value} {value === 1 ? 'mile' : 'miles'}</Text></View>
    <View ref={trackRef}
      accessibilityRole="adjustable"
      accessibilityLabel="Distance radius"
      accessibilityValue={{ min: 1, max: 100, now: value, text: `${value} ${value === 1 ? 'mile' : 'miles'}` }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={event => adjust(event.nativeEvent.actionName === 'increment' ? 1 : -1)}
      onLayout={event => { setWidth(event.nativeEvent.layout.width); trackRef.current?.measureInWindow?.(x => setLeft(x)); }}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponderCapture={() => true}
      onResponderGrant={updateFromTouch}
      onResponderMove={updateFromTouch}
      style={styles.sliderTrack}
    >
      <View style={[styles.sliderFill, { width: `${percentage}%` }]} />
      <View style={[styles.sliderThumb, { left: `${percentage}%` }]} />
    </View>
    <View style={styles.sliderLabels}><Text style={styles.sliderLabel}>1 mile</Text><Text style={styles.sliderLabel}>100 miles</Text></View>
  </View>;
}

function FilterSheet({ category, filters, setFilters, onDone, onCancel }) {
  const toggle = (key, value) => setFilters(current => ({ ...current, [key]: current[key].includes(value) ? current[key].filter(item => item !== value) : [...current[key], value] }));
  const clearCategory = () => setFilters(current => ({ ...current, [category]: category === 'radius' ? DEFAULT_FILTERS.radius : [] }));
  const titles = { radius: ['DISTANCE', 'How nearby?'], schedule: ['SCHEDULE', 'When could a visit work?'], experience: ['EXPERIENCE', 'What experience matters?'], home: ['HOME', 'What home environment fits?'] };
  const [eyebrow, title] = titles[category] || titles.radius;
  return <Modal visible transparent animationType="slide" onRequestClose={onCancel}>
    <View style={styles.sheetLayer}>
      <Pressable accessibilityLabel="Dismiss filters" onPress={onCancel} style={styles.sheetScrim} />
      <View style={styles.filterSheet}>
        <View style={styles.sheetHandle} />
        <View style={styles.sheetHeader}><View><Text style={styles.eyebrow}>{eyebrow}</Text><Text style={styles.h2}>{title}</Text></View><Pressable accessibilityRole="button" accessibilityLabel="Cancel filter changes" onPress={onCancel} style={styles.sheetClose}><Ionicons name="close" size={22} color={C.ink} /></Pressable></View>
        <ScrollView contentContainerStyle={styles.sheetContent} showsVerticalScrollIndicator={false}>
          {category === 'radius' && <DistanceSlider value={filters.radius} onChange={radius => setFilters(current => ({ ...current, radius }))} />}
          {category === 'schedule' && <><Text style={styles.filterHelp}>Choose times that could generally work. You can work out specific timing and commitments once you connect.</Text>{DAYS.map(day => <View key={day} style={styles.scheduleRow}><Text style={styles.scheduleDay}>{day}</Text><View style={styles.scheduleTimes}>{['AM', 'PM'].map(period => { const value = `${day} ${period}`; return <FilterChip key={value} label={period} accessibilityLabel={value} selected={filters.schedule.includes(value)} onPress={() => toggle('schedule', value)} />; })}</View></View>)}</>}
          {category === 'experience' && <><Text style={styles.filterHelp}>Select all dog-care experience that matters.</Text><View style={styles.filterChips}>{EXPERIENCE_OPTIONS.map(value => <FilterChip key={value} label={value} selected={filters.experience.includes(value)} onPress={() => toggle('experience', value)} />)}</View></>}
          {category === 'home' && <><Text style={styles.filterHelp}>Select every home requirement that applies.</Text><View style={styles.filterChips}>{HOME_OPTIONS.map(value => <FilterChip key={value} label={value} selected={filters.home.includes(value)} onPress={() => toggle('home', value)} />)}</View></>}
        </ScrollView>
        <View style={styles.sheetActions}><Button tone="light" label="Clear" onPress={clearCategory} /><Button label="Done" onPress={onDone} /></View>
      </View>
    </View>
  </Modal>;
}

function Discovery({ mode, profiles, decisions, setDecision, onOpen, onAccount }) {
  const [index, setIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState(null);
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS });
  const [draftFilters, setDraftFilters] = useState({ ...DEFAULT_FILTERS });
  const expectedRole = mode === 'owner' ? 'bonus' : 'owner';
  const visible = profiles.filter(p => p.role === expectedRole && p.distance <= filters.radius && filters.schedule.every(value => p.filterData.schedule.includes(value)) && filters.experience.every(value => p.filterData.experience.includes(value)) && filters.home.every(value => p.filterData.home.includes(value)));
  const p = visible[index % Math.max(visible.length, 1)];
  const move = amount => setIndex((index + amount + visible.length) % visible.length);
  const changeDecision = status => { if (p) setDecision(p.id, decisions[p.id] === status ? null : status); };
  const clearFilters = () => { setFilters({ ...DEFAULT_FILTERS }); setIndex(0); };
  const increaseDistance = () => { setFilters(current => ({ ...current, radius: Math.min(100, current.radius + 10) })); setIndex(0); };
  const categoryChips = [
    ['radius', `Distance · ${filters.radius} mi`, filters.radius !== DEFAULT_FILTERS.radius],
    ['schedule', `Schedule${filters.schedule.length ? ` · ${filters.schedule.length}` : ''}`, filters.schedule.length > 0],
    ['experience', `Experience${filters.experience.length ? ` · ${filters.experience.length}` : ''}`, filters.experience.length > 0],
    ['home', `Home${filters.home.length ? ` · ${filters.home.length}` : ''}`, filters.home.length > 0],
  ];
  return <View style={styles.flex}>
    <TopBar onAccount={onAccount} />
    <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.discoverIntro}><View><Text style={styles.eyebrow}>DISCOVER</Text><Text style={styles.h1}>Find their people.</Text></View></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterCategoryRow}>{categoryChips.map(([id, label, selected]) => <Pressable key={id} accessibilityRole="button" accessibilityLabel={`${label} filter`} accessibilityState={{ selected }} onPress={() => { setDraftFilters({ ...filters, schedule: [...filters.schedule], experience: [...filters.experience], home: [...filters.home] }); setActiveFilter(id); }} style={[styles.filterCategoryChip, selected && styles.filterCategoryChipActive]}><Text style={[styles.filterCategoryText, selected && styles.filterCategoryTextActive]}>{label}</Text><Ionicons name="chevron-down" size={14} color={selected ? C.white : C.sage} /></Pressable>)}</ScrollView>
      {activeFilter && <FilterSheet category={activeFilter} filters={draftFilters} setFilters={setDraftFilters} onDone={() => { setFilters(draftFilters); setActiveFilter(null); setIndex(0); }} onCancel={() => setActiveFilter(null)} />}
      {!p ? <View style={styles.emptyState}><Text style={styles.h3}>No profiles fit these filters</Text><Text style={styles.body}>Try expanding beyond the current {filters.radius}-mile radius or start again with all filters cleared.</Text><View style={styles.emptyActions}><Button small label="Increase distance" disabled={filters.radius === 100} onPress={increaseDistance} /><Button small tone="light" label="Clear filters" onPress={clearFilters} /></View></View> : <>
        <View style={styles.discoveryCard}><PhotoGallery photos={p.photos} style={styles.discoveryImage} />{decisions[p.id] && <View style={styles.decisionBadge}><Text style={styles.decisionBadgeText}>{decisions[p.id] === 'interested' ? 'INTERESTED' : 'PASSED — OPEN TO RECONSIDER'}</Text></View>}<View style={styles.cardBody}><Text style={styles.cardName}>{p.name}</Text><Text style={styles.location}>⌖  {p.location}</Text><Text style={styles.cardIntro}>{p.intro}</Text><View style={styles.pillRow}>{p.highlights.map(x => <Pill key={x}>{x}</Pill>)}</View><View style={styles.lookingBox}><Text style={styles.lookingLabel}>LOOKING FOR</Text><Text style={styles.lookingText}>{p.looking}</Text></View><Button label="View profile" tone="ghost" onPress={() => onOpen(p, visible, index % visible.length)} /></View></View>
        <View style={styles.browseControls}><Button small tone="light" label="← Previous" onPress={() => move(-1)} /><Text style={styles.centerHint}>{index + 1} of {visible.length}</Text><Button small tone="light" label="Next →" onPress={() => move(1)} /></View>
        <View style={styles.actionRow}><Button label={decisions[p.id] === 'passed' ? 'Reconsider pass' : 'Pass'} tone="light" onPress={() => changeDecision('passed')} /><Button label={decisions[p.id] === 'interested' ? 'Undo interested' : 'Interested'} onPress={() => changeDecision('interested')} /></View>
      </>}
    </ScrollView>
  </View>;
}

function PersonProfile({ profile, profiles, profileIndex, onNavigate, onBack, decision, setDecision }) {
  return <View style={styles.flex}><TopBar title="Profile" back onBack={onBack} />
    <ScrollView contentContainerStyle={styles.screenFlush} showsVerticalScrollIndicator={false}>
      <PhotoGallery photos={profile.photos} style={styles.profileHero} />
      <View style={styles.profileContent}>
        <Text style={styles.h1}>{profile.name}</Text><Text style={styles.location}>⌖  {profile.location}</Text>
        <Text style={styles.profileBio}>{profile.intro}</Text>
        <SectionTitle eyebrow="GOOD TO KNOW" title="The practical fit" />
        <View style={styles.attributeList}>{Object.entries(profile.attributes).map(([group, values]) => <View key={group} style={styles.attributeRow}><Text style={styles.attributeTitle}>{group}</Text><View style={styles.pillRowCompact}>{values.map(v => <Pill key={v}>{v}</Pill>)}</View></View>)}</View>
        <View style={styles.divider} />
        {profile.facts.map(([title, body]) => <View key={title} style={styles.fact}><Text style={styles.factTitle}>{title}</Text><Text style={styles.body}>{body}</Text></View>)}
        <Text style={styles.eyebrow}>A LITTLE MORE PERSONAL</Text>
        {profile.prompts.map(([q, a]) => <View key={q} style={styles.promptRow}><Text style={styles.promptQ}>{q}</Text><Text style={styles.promptA}>“{a}”</Text></View>)}
        <View style={styles.actionRow}><Button tone="light" label={decision === 'passed' ? 'Reconsider pass' : 'Pass'} onPress={() => setDecision(profile.id, decision === 'passed' ? null : 'passed')} /><Button label={decision === 'interested' ? 'Undo interested' : 'Interested'} onPress={() => setDecision(profile.id, decision === 'interested' ? null : 'interested')} /></View>
        <Text style={styles.safetyNote}>Nothing is permanent. You can revisit and change your choice from Connections.</Text>
        <View style={styles.browseControls}><Button small tone="light" label="← Previous" onPress={() => onNavigate(-1)} /><Text style={styles.centerHint}>{profileIndex + 1} of {profiles.length}</Text><Button small tone="light" label="Next →" onPress={() => onNavigate(1)} /></View>
      </View>
    </ScrollView>
  </View>;
}

function ZukiDetail({ onBack, onAccount }) {
  const [tab, setTab] = useState('profile');
  return <View style={styles.flex}><TopBar title="Zuki" back onBack={onBack} onAccount={onAccount} />
    <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.segment}>{[['profile', 'Profile'], ['care', 'Care Guide']].map(([id, label]) => <Pressable accessibilityRole="button" key={id} onPress={() => setTab(id)} style={[styles.segmentItem, tab === id && styles.segmentActive]}><Text style={[styles.segmentText, tab === id && styles.segmentTextActive]}>{label}</Text></Pressable>)}</View>
      {tab === 'profile' ? <>
        <PhotoGallery photos={[zukiImage, zukiWalkImage]} style={styles.petHero} />
        <View style={styles.petNameRow}><View><Text style={styles.h1}>Zuki</Text><Text style={styles.location}>16 years old · Chihuahua mix · 9 lbs</Text></View></View>
        <Text style={styles.profileBio}>A gentle senior with discerning taste in blankets. Zuki is happiest near her people, enjoys a slow sniff around the block, and prefers calm introductions.</Text>
        <View style={styles.pillRow}><Pill>Quiet companion</Pill><Pill>Senior savvy</Pill><Pill>No stairs</Pill></View>
        <SectionTitle eyebrow="AT A GLANCE" title="What Zuki needs" />
        <View style={styles.grid}>{[['◷', 'Routine', 'Meals at 8 AM & 5:30 PM'], ['♡', 'Comfort', 'Approach from the front'], ['✚', 'Health', 'Two daily medications'], ['⌂', 'Limits', 'Short walks, no stairs']].map(([icon, title, txt]) => <View key={title} style={styles.miniCard}><Text style={styles.miniIcon}>{icon}</Text><Text style={styles.miniTitle}>{title}</Text><Text style={styles.miniText}>{txt}</Text></View>)}</View>
        <Button label="Open Care Guide" onPress={() => setTab('care')} />
      </> : <CareGuideContent />}
    </ScrollView>
  </View>;
}

function PetsHub({ mode, onAccount }) {
  const [selected, setSelected] = useState(null);
  if (selected === 'zuki') return <ZukiDetail onBack={() => setSelected(null)} onAccount={onAccount} />;
  return <View style={styles.flex}><TopBar title="Pets" onAccount={onAccount} /><ScrollView contentContainerStyle={styles.screen}>
    <SectionTitle eyebrow={mode === 'owner' ? 'PETS YOU OWN' : 'PETS IN YOUR CONNECTIONS'} title={mode === 'owner' ? 'Your pets' : 'Connected pets'} />
    <Text style={styles.lede}>{mode === 'owner' ? 'Quick access to Zuki’s profile and practical Care Guide.' : 'Quick pet and Care access for your active Connections.'}</Text>
    <Pressable onPress={() => setSelected('zuki')} style={styles.petListCard}><Image source={zukiImage} style={styles.petListImage} /><View style={styles.connectionCopy}><Text style={styles.h3}>Zuki</Text><Text style={styles.body}>{mode === 'owner' ? 'Your 16-year-old Chihuahua mix' : 'Connected through Mike'}</Text><Text style={styles.cardLink}>Open Profile or Care Guide →</Text></View></Pressable>
  </ScrollView></View>;
}

function Feed({ onAccount }) {
  const initial = useMemo(() => [
    { id: 1, who: 'Haley', when: 'Today · 8:42 PM', text: 'Zuki ate dinner and took her medicine. She is now deeply committed to the couch.', photo: true, tag: 'Care update', liked: true, count: 2 },
    { id: 2, who: 'Mike', when: 'Yesterday · 6:15 PM', text: 'We went for a short, very sniff-focused walk. Excellent work all around.', photo: false, tag: 'Little moment', liked: false, count: 1 },
    { id: 3, who: 'Ari', when: 'Jun 14 · 4:02 PM', text: 'Sweet sixteen. The birthday girl tolerated her hat for approximately four seconds.', photo: true, tag: 'Milestone', liked: false, count: 2 },
  ], []);
  const [posts, setPosts] = useState(initial); const [draft, setDraft] = useState('');
  const post = () => { if (!draft.trim()) return; setPosts([{ id: Date.now(), who: 'Mike', when: 'Just now', text: draft.trim(), photo: false, tag: 'Update', liked: false, count: 0 }, ...posts]); setDraft(''); };
  const react = id => setPosts(posts.map(p => p.id === id ? { ...p, liked: !p.liked, count: p.count + (p.liked ? -1 : 1) } : p));
  return <View style={styles.flex}><TopBar title="Zuki’s feed" onAccount={onAccount} />
    <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <SectionTitle eyebrow="PRIVATE TO ZUKI’S PET CIRCLE" title="The little things, together" />
      <View style={styles.composer}><View style={styles.avatarMini}><Text style={styles.avatarMiniText}>M</Text></View><TextInput value={draft} onChangeText={setDraft} placeholder="Share a Zuki update…" placeholderTextColor="#929B94" style={styles.input} multiline /><Pressable onPress={post} style={[styles.send, !draft.trim() && { opacity: .35 }]}><Text style={styles.sendText}>↑</Text></Pressable></View>
      {posts.map((p, idx) => <View key={p.id} style={styles.post}>
        <View style={styles.postHeader}><View style={[styles.postAvatar, { backgroundColor: p.who === 'Mike' ? C.sage : C.clay }]}><Text style={styles.postAvatarText}>{p.who[0]}</Text></View><View style={styles.postMeta}><Text style={styles.postName}>{p.who}</Text><Text style={styles.postWhen}>{p.when}</Text></View><Pill warm={p.tag === 'Milestone'}>{p.tag}</Pill></View>
        <Text style={styles.postText}>{p.text}</Text>
        {p.photo && <Image source={idx === 2 ? zukiWalkImage : zukiImage} style={[styles.postImage, idx === 2 && { height: 210 }]} />}
        <Pressable accessibilityLabel={`React to ${p.who}'s update`} onPress={() => react(p.id)} style={[styles.postFooter, p.liked && styles.postFooterLiked]}><Text style={[styles.postHeart, p.liked && styles.postHeartLiked]}>{p.liked ? '♥' : '♡'}</Text><Text style={[styles.postFooterText, p.liked && { color: C.clay }]}>{p.liked ? `You${p.count > 1 ? ` and ${p.count - 1} other${p.count > 2 ? 's' : ''}` : ''} love this` : `${p.count} ${p.count === 1 ? 'person loves' : 'people love'} this`}</Text></Pressable>
      </View>)}
    </ScrollView>
  </View>;
}

function CareGuideContent() {
  const [done, setDone] = useState({ breakfast: true, walk: false, dinner: false });
  return <>
      <View style={styles.careHero}><Image source={zukiImage} style={styles.careAvatar} /><View style={styles.availText}><Text style={styles.eyebrow}>ZUKI · UPDATED 2 DAYS AGO</Text><Text style={styles.h2}>Everything you need, quickly.</Text></View></View>
      <View style={styles.todayCard}><View style={styles.todayHeader}><View><Text style={[styles.eyebrow, { color: C.gold }]}>TODAY · THURSDAY</Text><Text style={[styles.h3, { color: C.white }]}>Care checklist</Text></View><Text style={styles.progress}>{Object.values(done).filter(Boolean).length}/3</Text></View>
        {[['breakfast', '8:00 AM', 'Breakfast + heart medicine'], ['walk', '12:30 PM', 'Short sniff walk'], ['dinner', '5:30 PM', 'Dinner + joint chew']].map(([id, time, label]) => <Pressable key={id} onPress={() => setDone({ ...done, [id]: !done[id] })} style={styles.checkRow}><View style={[styles.checkbox, done[id] && styles.checkboxDone]}><Text style={styles.checkmark}>{done[id] ? '✓' : ''}</Text></View><Text style={styles.checkTime}>{time}</Text><Text style={[styles.checkLabel, done[id] && styles.strike]}>{label}</Text></Pressable>)}
      </View>
      {careSections.map(([title, body], i) => <View key={title} style={[styles.careSection, (i === 5 || i === 6) && styles.careEmergency]}><View style={[styles.careIcon, (i === 5 || i === 6) && { backgroundColor: C.clayLight }]}><Text style={styles.careIconText}>{['◷', '⌂', '✚', '↗', '♡', '!', '+'][i]}</Text></View><View style={styles.careCopy}><Text style={styles.factTitle}>{title}</Text><Text style={styles.careBody}>{body}</Text></View></View>)}
      <Text style={styles.safetyNote}>This guide is shared by Mike. When something feels wrong, contact him rather than guessing.</Text>
    </>;
}

function Care({ onBack, onAccount }) {
  return <View style={styles.flex}><TopBar title="Zuki · Care Guide" back onBack={onBack} onAccount={onAccount} /><ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}><CareGuideContent /></ScrollView></View>;
}

function DecisionList({ status, decisions, setDecision, onOpen, profiles }) {
  const saved = profiles.filter(profile => decisions[profile.id] === status);
  if (!saved.length) return <View style={styles.emptyState}><Text style={styles.h3}>No {status} profiles yet</Text><Text style={styles.body}>{status === 'interested' ? 'Profiles you mark Interested will stay here for easy review.' : 'Profiles you pass on will stay here until you reconsider them.'}</Text></View>;
  return <View>{saved.map(profile => <View key={profile.id} style={styles.decisionListCard}><Pressable onPress={() => onOpen(profile)} style={styles.decisionProfileLink}><Image source={profile.image} style={styles.decisionImage} /><View style={styles.connectionCopy}><Text style={styles.h3}>{profile.name}</Text><Text style={styles.location}>{profile.location}</Text><Text style={styles.cardLink}>View profile →</Text></View></Pressable><Button small tone="light" label={status === 'interested' ? 'Undo interested' : 'Reconsider pass'} onPress={() => setDecision(profile.id, null)} /></View>)}</View>;
}

const CONNECTION_STAGES = ['Meet & Greet', 'Trial Visits', 'Regular Bonus Human'];

function ScheduleSheet({ kind, onCancel, onRequest }) {
  const [date, setDate] = useState('Thursday, August 20');
  const [start, setStart] = useState('7:00 PM');
  const [end, setEnd] = useState('8:00 PM');
  const title = kind === 'Meet & Greet' ? 'Schedule Meet & Greet' : kind === 'Trial Visit' ? 'Schedule trial visit' : 'Request one-off visit';
  return <Modal visible transparent animationType="slide" onRequestClose={onCancel}><View style={styles.sheetLayer}><Pressable accessibilityLabel="Dismiss scheduling" onPress={onCancel} style={styles.sheetScrim} /><View style={styles.filterSheet}><View style={styles.sheetHandle} /><View style={styles.sheetHeader}><View><Text style={styles.eyebrow}>SCHEDULING</Text><Text style={styles.h2}>{title}</Text></View><Pressable accessibilityLabel="Cancel scheduling" onPress={onCancel} style={styles.sheetClose}><Ionicons name="close" size={22} color={C.ink} /></Pressable></View><View style={styles.sheetContent}><Text style={styles.fieldLabel}>Date</Text><TextInput accessibilityLabel="Visit date" value={date} onChangeText={setDate} style={styles.field} /><View style={styles.timeFields}><View style={styles.timeField}><Text style={styles.fieldLabel}>Start time</Text><TextInput accessibilityLabel="Start time" value={start} onChangeText={setStart} style={styles.field} /></View><View style={styles.timeField}><Text style={styles.fieldLabel}>End time</Text><TextInput accessibilityLabel="End time" value={end} onChangeText={setEnd} style={styles.field} /></View></View><Text style={styles.filterHelp}>This mocked request stays on this device and can be confirmed, declined, or rescheduled.</Text></View><View style={styles.sheetActions}><Button tone="light" label="Cancel" onPress={onCancel} /><Button label="Send request" onPress={() => onRequest({ kind, date, start, end, status: 'requested' })} /></View></View></View></Modal>;
}

function ConnectionTimeline({ stage }) {
  return <View style={styles.timeline}>{CONNECTION_STAGES.map((label, index) => <View key={label} style={styles.timelineStep}><View style={[styles.timelineDot, index <= stage && styles.timelineDotActive]}><Text style={styles.timelineCheck}>{index < stage ? '✓' : ''}</Text></View><Text style={[styles.timelineLabel, index <= stage && { color: C.ink }]}>{label}</Text>{index < 2 && <View style={[styles.timelineBar, index < stage && styles.timelineBarActive]} />}</View>)}</View>;
}

function ConnectionDetail({ connection, setConnection, messages, setMessages, onBack, onAccount, onOpenPerson, onOpenPet }) {
  const overviewScroll = useRef(null);
  const [tab, setTab] = useState('overview');
  const [draft, setDraft] = useState('');
  const [scheduleKind, setScheduleKind] = useState(null);
  const [showEnd, setShowEnd] = useState(false);
  const [endReason, setEndReason] = useState('');
  const [reportStarted, setReportStarted] = useState(false);
  const addActivity = text => setMessages(current => [...current, { id: Date.now() + Math.random(), who: 'Activity', text, system: true }]);
  const updateStage = next => { setConnection(current => ({ ...current, stage: next })); addActivity(`Connection stage changed to ${CONNECTION_STAGES[next]}.`); overviewScroll.current?.scrollTo?.({ y: 0, animated: false }); };
  const requestEvent = event => { const rescheduled = Boolean(connection.event); setConnection(current => ({ ...current, event })); addActivity(`Haley & Ari ${rescheduled ? 'rescheduled' : 'requested'} a ${event.kind}: ${event.date}, ${event.start}–${event.end}.`); setScheduleKind(null); };
  const respond = status => { setConnection(current => ({ ...current, event: { ...current.event, status } })); addActivity(`Mike ${status === 'confirmed' ? 'confirmed' : 'declined'} the ${connection.event.kind}.`); };
  const send = () => { if (!draft.trim()) return; setMessages(current => [...current, { id: Date.now(), who: 'Mike', text: draft.trim() }]); setDraft(''); };
  const primaryKind = connection.stage === 0 ? 'Meet & Greet' : connection.stage === 1 ? 'Trial Visit' : 'Visit';
  if (!connection.active) return <View style={styles.flex}><TopBar title="Connection ended" back onBack={onBack} onAccount={onAccount} /><View style={styles.screen}><View style={styles.emptyState}><Text style={styles.h3}>This Connection has ended</Text><Text style={styles.body}>Its shared history remains available in this local prototype.</Text></View></View></View>;
  return <View style={styles.flex}><TopBar title="Haley & Ari" back onBack={onBack} onAccount={onAccount} />
    <View style={styles.connectionSummary}><Image source={zukiImage} style={styles.connectionImage} /><View style={styles.connectionCopy}><Text style={styles.h3}>Mike + Haley & Ari</Text><Text style={styles.body}>with Zuki · {CONNECTION_STAGES[connection.stage]}</Text></View></View>
    <View style={[styles.segment, styles.detailSegment]}>{[['overview', 'Overview'], ['chat', 'Chat']].map(([id, label]) => <Pressable accessibilityRole="button" accessibilityLabel={`${label} Connection tab`} key={id} onPress={() => setTab(id)} style={[styles.segmentItem, tab === id && styles.segmentActive]}><Text style={[styles.segmentText, tab === id && styles.segmentTextActive]}>{label}</Text></Pressable>)}</View>
    {tab === 'overview' ? <ScrollView ref={overviewScroll} contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
      <SectionTitle eyebrow="CONNECTION" title="Mike, Haley & Ari, and Zuki" />
      <View style={styles.peopleStrip}><Pressable accessibilityRole="button" accessibilityLabel="Open Mike profile" onPress={() => onOpenPerson('mike')} style={styles.personCircle}><Image source={mikeImage} style={styles.personCircleImage} /><Text style={styles.personName}>Mike</Text><Text style={styles.personRole}>Pet Owner</Text></Pressable><View style={styles.relationshipLine} /><Pressable accessibilityRole="button" accessibilityLabel="Open Zuki profile" onPress={onOpenPet} style={styles.petCircle}><Image source={zukiImage} style={styles.personCircleImage} /><Text style={styles.personName}>Zuki</Text><Text style={styles.personRole}>Pet</Text></Pressable><View style={styles.relationshipLine} /><Pressable accessibilityRole="button" accessibilityLabel="Open Haley and Ari profile" onPress={() => onOpenPerson('haley')} style={styles.personCircle}><Image source={peopleImage} style={styles.personCircleImage} /><Text style={styles.personName}>Haley & Ari</Text><Text style={styles.personRole}>Bonus Humans</Text></Pressable></View>
      <View style={styles.relationshipStatus}><Text style={styles.lookingLabel}>CONNECTION STAGE</Text><Text style={styles.h3}>{CONNECTION_STAGES[connection.stage]}</Text><ConnectionTimeline stage={connection.stage} /></View>
      <SectionTitle eyebrow="NEXT STEP" title={connection.stage === 0 ? 'Plan the first Meet & Greet' : connection.stage === 1 ? 'Try time together with Zuki' : 'Keep the rhythm working'} />
      {connection.stage < 2 ? <Button label={`Schedule ${primaryKind}`} onPress={() => setScheduleKind(primaryKind)} /> : <View style={styles.regularActions}><Button label="Request a one-off visit" onPress={() => setScheduleKind('Visit')} /><Button tone="light" label="Manage recurring schedule" onPress={() => setConnection(current => ({ ...current, recurring: current.recurring || { day: 'Thursday', start: '7:00 PM', end: '9:00 PM', editing: true } }))} /></View>}
      {connection.recurring && <View style={styles.requestCard}><Text style={styles.requestTitle}>Recurring schedule</Text>{connection.recurring.editing ? <><Text style={styles.fieldLabel}>Day</Text><TextInput accessibilityLabel="Recurring day" value={connection.recurring.day} onChangeText={day => setConnection(current => ({ ...current, recurring: { ...current.recurring, day } }))} style={styles.field} /><View style={styles.timeFields}><View style={styles.timeField}><Text style={styles.fieldLabel}>Start</Text><TextInput accessibilityLabel="Recurring start time" value={connection.recurring.start} onChangeText={start => setConnection(current => ({ ...current, recurring: { ...current.recurring, start } }))} style={styles.field} /></View><View style={styles.timeField}><Text style={styles.fieldLabel}>End</Text><TextInput accessibilityLabel="Recurring end time" value={connection.recurring.end} onChangeText={end => setConnection(current => ({ ...current, recurring: { ...current.recurring, end } }))} style={styles.field} /></View></View><Button small label="Save recurring schedule" onPress={() => { setConnection(current => ({ ...current, recurring: { ...current.recurring, editing: false } })); addActivity('The recurring schedule was updated.'); }} /></> : <><Text style={styles.body}>Every {connection.recurring.day} · {connection.recurring.start}–{connection.recurring.end}</Text><Button small tone="light" label="Edit recurring schedule" onPress={() => setConnection(current => ({ ...current, recurring: { ...current.recurring, editing: true } }))} /></>}</View>}
      {connection.event && <View style={connection.event.status === 'confirmed' ? styles.confirmed : styles.requestCard}><Text style={connection.event.status === 'confirmed' ? styles.confirmedIcon : styles.requestTitle}>{connection.event.status === 'confirmed' ? '✓' : connection.event.status.toUpperCase()}</Text><View style={styles.eventCopy}><Text style={styles.requestTitle}>{connection.event.kind}</Text>{connection.event.status === 'confirmed' && <StatusLabel tone="success">Confirmed</StatusLabel>}<Text style={styles.body}>{connection.event.date} · {connection.event.start}–{connection.event.end}</Text>{connection.event.status === 'requested' && <View style={styles.inlineActions}><Button small label="Confirm as Mike" onPress={() => respond('confirmed')} /><Button small tone="light" label="Decline" onPress={() => respond('declined')} /><Button small tone="ghost" label="Reschedule" onPress={() => setScheduleKind(connection.event.kind)} /></View>}</View></View>}
      <View style={styles.stageActions}>{connection.stage > 0 && <Button small tone="light" label={`Back to ${CONNECTION_STAGES[connection.stage - 1]}`} onPress={() => updateStage(connection.stage - 1)} />}{connection.stage < 2 && <Button small tone="ghost" label={connection.stage === 0 ? 'Skip to Trial Visits' : 'Move to Regular Bonus Human'} onPress={() => updateStage(connection.stage + 1)} />}</View>
      <SectionTitle eyebrow="QUICK LINKS" title="Profiles and Care" /><View style={styles.quickGrid}><Button tone="ghost" label="View Zuki" onPress={onOpenPet} /><Button tone="ghost" label="Chat" onPress={() => setTab('chat')} /></View>
      <Pressable accessibilityRole="button" onPress={() => setShowEnd(true)} style={styles.endConnection}><Text style={styles.endConnectionText}>End Connection</Text></Pressable>
    </ScrollView> : <><ScrollView contentContainerStyle={styles.chat} keyboardShouldPersistTaps="handled">{messages.map(m => <View key={m.id} style={m.system ? styles.activityBubble : [styles.bubble, m.who === 'Mike' ? styles.bubbleMine : styles.bubbleTheirs]}>{m.system ? <Text style={styles.activityText}>{m.text}</Text> : <><Text style={styles.bubbleWho}>{m.who}</Text><Text style={styles.bubbleText}>{m.text}</Text></>}</View>)}</ScrollView><View style={styles.chatComposer}><TextInput value={draft} onChangeText={setDraft} placeholder="Message Haley & Ari…" placeholderTextColor="#929B94" style={styles.input} /><Button small label="Send" onPress={send} /></View></>}
    {scheduleKind && <ScheduleSheet kind={scheduleKind} onCancel={() => setScheduleKind(null)} onRequest={requestEvent} />}
    {showEnd && <Modal visible transparent animationType="fade" onRequestClose={() => setShowEnd(false)}><View style={styles.dialogLayer}><View style={styles.dialog}><Text style={styles.eyebrow}>{reportStarted ? 'SERIOUS PROBLEM' : 'END CONNECTION'}</Text><Text style={styles.h2}>{reportStarted ? 'Tell us what happened' : 'Are you sure?'}</Text><Text style={styles.body}>{reportStarted ? 'This prototype does not send a report. In production, this would open a private safety form and support options.' : 'This ends the Connection for Mike, Haley & Ari, and Zuki. Feedback is optional.'}</Text>{!reportStarted && <><View style={styles.filterChips}>{["It wasn't a good fit", "Availability didn't work", "Communication wasn't working", "Care instructions weren't followed", 'Other'].map(reason => <FilterChip key={reason} label={reason} selected={endReason === reason} onPress={() => setEndReason(reason)} />)}</View><Pressable accessibilityRole="button" onPress={() => setReportStarted(true)} style={styles.reportLink}><Text style={styles.endConnectionText}>Report a serious problem</Text></Pressable></>}<View style={styles.actionRow}>{reportStarted ? <Button tone="light" label="Back" onPress={() => setReportStarted(false)} /> : <><Button tone="light" label="Keep Connection" onPress={() => setShowEnd(false)} /><Button tone="danger" label="End Connection" onPress={() => { setConnection(current => ({ ...current, active: false, endReason })); addActivity('Mike ended the Connection.'); setShowEnd(false); }} /></>}</View></View></View></Modal>}
  </View>;
}

function Connections({ onAccount, decisions, setDecision, onOpen, profiles, connection, setConnection, messages, setMessages, onOpenPet }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState('connected');
  if (open) return <ConnectionDetail connection={connection} setConnection={setConnection} messages={messages} setMessages={setMessages} onBack={() => setOpen(false)} onAccount={onAccount} onOpenPerson={id => onOpen(profiles.find(profile => profile.id === id), profiles, profiles.findIndex(profile => profile.id === id))} onOpenPet={onOpenPet} />;
  return <View style={styles.flex}><TopBar title="Connections" onAccount={onAccount} /><ScrollView contentContainerStyle={styles.screen}>
    <View style={styles.connectionTabs}>{[['connected', 'Connected'], ['interested', 'Interested'], ['passed', 'Passed']].map(([id, label]) => <Pressable accessibilityRole="button" key={id} onPress={() => setView(id)} style={[styles.connectionTab, view === id && styles.connectionTabActive]}><Text style={[styles.connectionTabText, view === id && styles.connectionTabTextActive]}>{label}</Text></Pressable>)}</View>
    {view === 'connected' ? <><SectionTitle eyebrow="YOUR CONNECTIONS" title="People you’re building with" />{connection.active ? <Pressable accessibilityRole="button" accessibilityLabel="Open Haley and Ari Connection" onPress={() => setOpen(true)} style={styles.connectedCard}><Image source={peopleImage} style={styles.connectedImage} /><View style={styles.connectionCopy}><View style={styles.connectedTitleRow}><Text style={styles.h3}>Haley & Ari</Text><View style={styles.unreadDot}><Text style={styles.unreadText}>1</Text></View></View><Text style={styles.body}>with Mike + Zuki</Text><Text style={styles.connectedStatus}>● {CONNECTION_STAGES[connection.stage]}</Text><Text style={styles.messagePreview}>Planning their first Meet & Greet</Text></View><Text style={styles.chevron}>›</Text></Pressable> : <View style={styles.emptyState}><Text style={styles.h3}>No active Connections</Text><Text style={styles.body}>Discover people who could become a lasting part of life with your pet.</Text></View>}</> : <><SectionTitle eyebrow={view === 'interested' ? 'AWAITING MUTUAL INTEREST' : 'NOT RIGHT NOW'} title={view === 'interested' ? 'Interested profiles' : 'Passed profiles'} /><DecisionList status={view} decisions={decisions} setDecision={setDecision} onOpen={onOpen} profiles={profiles} /></>}
  </ScrollView></View>;
}

function UIGallery({ onBack }) {
  const [radius, setRadius] = useState(12);
  const [chipSelected, setChipSelected] = useState(true);
  const [galleryTab, setGalleryTab] = useState('active');
  const [reaction, setReaction] = useState(false);
  const [sampleName, setSampleName] = useState('Mike');
  return <View style={styles.flex}><TopBar title="UI Gallery (Dev)" back onBack={onBack} />
    <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <Text style={styles.galleryIntro}>Development reference for reviewing Bonus Human’s reusable visual patterns in one place.</Text>

      <SectionTitle eyebrow="FOUNDATIONS" title="Typography & headers" />
      <View style={styles.gallerySection}><Text style={styles.h1}>Screen title</Text><Text style={styles.h2}>Section header</Text><Text style={styles.h3}>Card title</Text><Text style={styles.body}>Body text explains a feature or Connection in a calm, readable voice.</Text><Text style={styles.location}>Helper text · General location</Text><Text style={styles.eyebrow}>LABEL / EYEBROW</Text></View>

      <SectionTitle eyebrow="ACTIONS" title="Buttons" />
      <View style={styles.gallerySection}><Button label="Primary action" /><Button label="Secondary action" tone="light" /><Button label="Outline action" tone="ghost" /><Button label="Destructive action" tone="danger" /><Button label="Disabled action" disabled /><View style={styles.iconButtonRow}><Pressable accessibilityRole="button" accessibilityLabel="Back icon example" style={styles.galleryIconButton}><Text style={styles.galleryIcon}>‹</Text></Pressable><Pressable accessibilityRole="button" accessibilityLabel="Send icon example" style={[styles.galleryIconButton, styles.galleryIconButtonPrimary]}><Text style={[styles.galleryIcon, { color: C.white }]}>↑</Text></Pressable><Pressable accessibilityRole="button" accessibilityLabel="Favorite icon example" style={styles.galleryIconButton}><Text style={[styles.galleryIcon, { color: C.clay }]}>♡</Text></Pressable></View></View>

      <SectionTitle eyebrow="CHOICES" title="Tags, chips & filters" />
      <View style={styles.gallerySection}><View style={styles.pillRowCompact}><Pill>Senior-dog experience</Pill><Pill warm>Milestone</Pill><StatusLabel tone="success">Confirmed</StatusLabel><StatusLabel tone="warning">Awaiting Pet Owner</StatusLabel><StatusLabel>Informational</StatusLabel></View><View style={styles.filterCategoryRow}><View style={styles.filterCategoryChip}><Text style={styles.filterCategoryText}>Distance · 12 mi</Text><Ionicons name="chevron-down" size={14} color={C.sage} /></View><View style={[styles.filterCategoryChip, styles.filterCategoryChipActive]}><Text style={styles.filterCategoryTextActive}>Schedule · 2</Text><Ionicons name="chevron-down" size={14} color={C.white} /></View></View><View style={styles.filterChips}><FilterChip label="Unselected" selected={false} onPress={() => {}} /><FilterChip label="Selected" selected={chipSelected} onPress={() => setChipSelected(!chipSelected)} /></View><DistanceSlider value={radius} onChange={setRadius} /><View style={styles.scheduleRow}><Text style={styles.scheduleDay}>Thursday</Text><View style={styles.scheduleTimes}><FilterChip label="AM" accessibilityLabel="Gallery Thursday AM" selected={false} onPress={() => {}} /><FilterChip label="PM" accessibilityLabel="Gallery Thursday PM" selected onPress={() => {}} /></View></View></View>

      <SectionTitle eyebrow="NAVIGATION" title="Active & inactive tabs" />
      <View style={[styles.connectionTabs, styles.gallerySection]}>{[['active', 'Active'], ['inactive', 'Inactive'], ['saved', 'Saved 2']].map(([id, label]) => <Pressable key={id} onPress={() => setGalleryTab(id)} style={[styles.connectionTab, galleryTab === id && styles.connectionTabActive]}><Text style={[styles.connectionTabText, galleryTab === id && styles.connectionTabTextActive]}>{label}</Text></Pressable>)}</View>

      <SectionTitle eyebrow="IMAGERY" title="Photo gallery treatment" />
      <View style={styles.gallerySection}><PhotoGallery photos={[peopleImage, peopleWalkImage]} style={styles.galleryPhoto} /></View>

      <SectionTitle eyebrow="CARDS" title="Profile card" />
      <View style={styles.discoveryCard}><PhotoGallery photos={[jordanImage, jordanWalkImage]} style={styles.galleryProfileImage} /><View style={styles.cardBody}><Text style={styles.cardName}>Jordan</Text><Text style={styles.location}>⌖  Sellwood · 6.8 mi</Text><Text style={styles.cardIntro}>A former lab parent looking for one lasting local connection.</Text><View style={styles.pillRow}><Pill>Weekend mornings</Pill><Pill>Fenced yard</Pill></View><Button label="View profile" tone="ghost" /></View></View>

      <SectionTitle eyebrow="OBJECTS" title="Pet cards & Connection stages" />
      <View style={styles.petListCard}><Image source={zukiImage} style={styles.petListImage} /><View style={styles.connectionCopy}><Text style={styles.h3}>Zuki</Text><Text style={styles.body}>16-year-old Chihuahua mix</Text><Text style={styles.cardLink}>Open pet profile →</Text></View></View>
      <View style={styles.relationshipStatus}><Text style={styles.lookingLabel}>CONNECTION STAGE</Text><Text style={styles.h3}>Regular Bonus Human</Text><ConnectionTimeline stage={2} /></View>

      <SectionTitle eyebrow="CARDS" title="Feed & reactions" />
      <View style={styles.post}><View style={styles.postHeader}><View style={[styles.postAvatar, { backgroundColor: C.clay }]}><Text style={styles.postAvatarText}>H</Text></View><View style={styles.postMeta}><Text style={styles.postName}>Haley</Text><Text style={styles.postWhen}>Today · 8:42 PM</Text></View><Pill>Care update</Pill></View><Text style={styles.postText}>Zuki ate dinner and took her medicine. She is now deeply committed to the couch.</Text><Image source={zukiImage} style={styles.postImage} /><Pressable accessibilityRole="button" accessibilityLabel="Gallery reaction example" onPress={() => setReaction(!reaction)} style={[styles.postFooter, reaction && styles.postFooterLiked]}><Text style={[styles.postHeart, reaction && styles.postHeartLiked]}>{reaction ? '♥' : '♡'}</Text><Text style={[styles.postFooterText, reaction && { color: C.clay }]}>{reaction ? 'You love this' : '2 people love this'}</Text></Pressable></View>

      <SectionTitle eyebrow="FORMS" title="Inputs & states" />
      <View style={styles.gallerySection}><Text style={styles.fieldLabel}>First name</Text><TextInput accessibilityLabel="Gallery first name" value={sampleName} onChangeText={setSampleName} style={styles.field} /><Text style={styles.fieldLabel}>Short bio</Text><TextInput accessibilityLabel="Gallery short bio" placeholder="Tell people about yourself…" placeholderTextColor="#929B94" style={[styles.field, styles.fieldMultiline]} multiline /><View style={styles.preferenceRow}><View><Text style={styles.factTitle}>Notifications</Text><Text style={styles.body}>Selected / enabled state</Text></View><View style={[styles.switchTrack, styles.switchTrackOn]}><View style={[styles.switchKnob, styles.switchKnobOn]} /></View></View></View>

      <SectionTitle eyebrow="SCHEDULING" title="Availability & Visit confirmation" />
      <View style={styles.availabilityCard}><View style={styles.dateBox}><Text style={styles.dateDay}>THU</Text><Text style={styles.dateNum}>20</Text></View><View style={styles.availText}><Text style={styles.h3}>7:00–11:00 PM</Text><Text style={styles.body}>Mike marked Zuki as available</Text></View></View><View style={styles.confirmed}><Text style={styles.confirmedIcon}>✓</Text><View><Text style={styles.requestTitle}>Visit confirmed</Text><Text style={styles.body}>Haley & Ari · Thursday evening</Text></View></View>

      <SectionTitle eyebrow="FEEDBACK" title="Empty state" />
      <View style={styles.emptyState}><Text style={styles.h3}>No profiles fit these filters</Text><Text style={styles.body}>Try increasing the distance or clearing your filters.</Text><View style={styles.emptyActions}><Button small label="Increase distance" /><Button small tone="light" label="Clear filters" /></View></View>
    </ScrollView>
  </View>;
}

function ProfileEditor({ profile, onSave, onBack }) {
  const [draft, setDraft] = useState({ ...profile, filterData: { ...profile.filterData, schedule: [...profile.filterData.schedule], experience: [...profile.filterData.experience], home: [...profile.filterData.home] }, facts: profile.facts.map(item => [...item]) });
  const [saved, setSaved] = useState(false);
  const [photoAdded, setPhotoAdded] = useState(false);
  const updateTags = (key, value) => setDraft(current => ({ ...current, filterData: { ...current.filterData, [key]: current.filterData[key].includes(value) ? current.filterData[key].filter(item => item !== value) : [...current.filterData[key], value] } }));
  const updateFact = (index, value) => setDraft(current => ({ ...current, facts: current.facts.map((item, i) => i === index ? [item[0], value] : item) }));
  return <View style={styles.flex}><TopBar title="Edit profile" back onBack={onBack} /><ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
    <SectionTitle eyebrow="BASICS" title="How you appear in Discover" /><Text style={styles.fieldLabel}>Name</Text><TextInput accessibilityLabel="Profile name" value={draft.name} onChangeText={name => setDraft({ ...draft, name })} style={styles.field} /><Text style={styles.fieldLabel}>Short bio</Text><TextInput accessibilityLabel="Profile bio" value={draft.intro} onChangeText={intro => setDraft({ ...draft, intro })} style={[styles.field, styles.fieldMultiline]} multiline /><Text style={styles.fieldLabel}>Neighborhood / location</Text><TextInput accessibilityLabel="Profile location" value={draft.location} onChangeText={location => setDraft({ ...draft, location })} style={styles.field} /><Text style={styles.fieldLabel}>Connection you hope to build</Text><TextInput accessibilityLabel="Connection hopes" value={draft.looking} onChangeText={looking => setDraft({ ...draft, looking })} style={[styles.field, styles.fieldMultiline]} multiline />
    <SectionTitle eyebrow="AVAILABILITY" title="Broad times that could work" /><Text style={styles.filterHelp}>Use the same broad weekday and AM/PM choices people can filter in Discover.</Text>{DAYS.map(day => <View key={day} style={styles.scheduleRow}><Text style={styles.scheduleDay}>{day}</Text><View style={styles.scheduleTimes}>{['AM', 'PM'].map(period => { const value = `${day} ${period}`; return <FilterChip key={value} label={period} accessibilityLabel={`Profile ${value}`} selected={draft.filterData.schedule.includes(value)} onPress={() => updateTags('schedule', value)} />; })}</View></View>)}
    <SectionTitle eyebrow="EXPERIENCE" title="Dog-care experience" /><View style={styles.filterChips}>{EXPERIENCE_OPTIONS.map(value => <FilterChip key={value} label={value} accessibilityLabel={`Profile experience ${value}`} selected={draft.filterData.experience.includes(value)} onPress={() => updateTags('experience', value)} />)}</View>
    <SectionTitle eyebrow="HOME" title="Home environment" /><View style={styles.filterChips}>{HOME_OPTIONS.map(value => <FilterChip key={value} label={value} accessibilityLabel={`Profile home ${value}`} selected={draft.filterData.home.includes(value)} onPress={() => updateTags('home', value)} />)}</View>
    <SectionTitle eyebrow="YOUR STORY" title="Detailed profile prompts" />{draft.facts.map(([title, body], index) => <View key={title}><Text style={styles.fieldLabel}>{title}</Text><TextInput accessibilityLabel={title} value={body} onChangeText={value => updateFact(index, value)} style={[styles.field, styles.fieldMultiline]} multiline /></View>)}
    <SectionTitle eyebrow="PHOTOS" title="Manage profile photos" /><View style={styles.photoManager}><Image source={mikeImage} style={styles.photoThumb} /><Image source={zukiImage} style={styles.photoThumb} />{photoAdded && <Image source={peopleWalkImage} style={styles.photoThumb} />}<Pressable onPress={() => setPhotoAdded(true)} style={styles.addPhoto}><Text style={styles.addPhotoPlus}>＋</Text><Text style={styles.addPhotoText}>Add mocked photo</Text></Pressable></View>
    <Button small label={saved ? 'Saved ✓' : 'Save profile'} onPress={() => { onSave(draft); setSaved(true); }} />
  </ScrollView></View>;
}

function Account({ mode, onModeChange, onBack, profile, onSaveProfile, onManagePets }) {
  const [screen, setScreen] = useState('hub');
  const [notifications, setNotifications] = useState(true);
  if (screen === 'edit') return <ProfileEditor profile={profile} onSave={onSaveProfile} onBack={() => setScreen('hub')} />;
  if (screen === 'mode') return <View style={styles.flex}><TopBar title="Mode" back onBack={() => setScreen('hub')} /><View style={styles.screen}><SectionTitle eyebrow="MODE" title="How are you using Bonus Human?" /><View style={styles.modeToggle}><Pressable accessibilityRole="button" onPress={() => onModeChange('owner')} style={[styles.modeChoice, mode === 'owner' && styles.modeChoiceActive]}><Text style={[styles.modeChoiceTitle, mode === 'owner' && styles.modeChoiceTitleActive]}>Pet Owner</Text><Text style={styles.modeChoiceText}>Find Bonus Humans</Text></Pressable><Pressable accessibilityRole="button" onPress={() => onModeChange('bonus')} style={[styles.modeChoice, mode === 'bonus' && styles.modeChoiceActive]}><Text style={[styles.modeChoiceTitle, mode === 'bonus' && styles.modeChoiceTitleActive]}>Bonus Human</Text><Text style={styles.modeChoiceText}>Find Pet Owners and pets</Text></Pressable></View></View></View>;
  if (screen === 'settings') return <View style={styles.flex}><TopBar title="Settings" back onBack={() => setScreen('hub')} /><View style={styles.screen}><SectionTitle eyebrow="PREFERENCES" title="Notifications" /><Pressable accessibilityRole="button" onPress={() => setNotifications(!notifications)} style={styles.preferenceRow}><View><Text style={styles.factTitle}>Notifications</Text><Text style={styles.body}>Connections, messages, and Care updates</Text></View><View style={[styles.switchTrack, notifications && styles.switchTrackOn]}><View style={[styles.switchKnob, notifications && styles.switchKnobOn]} /></View></Pressable></View></View>;
  const rows = [['mode', 'Mode', mode === 'owner' ? 'Pet Owner' : 'Bonus Human'], ['edit', 'Edit profile', 'Photos, availability, experience, and prompts'], ...(mode === 'owner' ? [['pets', 'Manage pets', 'Zuki’s Profile and Care Guide']] : []), ['settings', 'Settings', 'Notifications'], ['help', 'Help', 'Prototype placeholder'], ['about', 'About', 'Bonus Human']];
  return <View style={styles.flex}><TopBar title="Account" back onBack={onBack} /><ScrollView contentContainerStyle={styles.screen}><View style={styles.myHeader}><Image source={mikeImage} style={styles.myImage} /><View style={styles.myCopy}><Text style={styles.h2}>{profile.name}</Text><Text style={styles.location}>{mode === 'owner' ? 'Pet Owner' : 'Bonus Human'}</Text><Pill>Profile 85% complete</Pill></View></View><SectionTitle eyebrow="ACCOUNT" title="Your Bonus Human hub" /><View style={styles.accountRows}>{rows.map(([id, title, detail]) => <Pressable accessibilityRole="button" accessibilityLabel={title} key={id} onPress={() => id === 'pets' ? onManagePets() : ['mode', 'edit', 'settings'].includes(id) ? setScreen(id) : null} style={styles.accountRow}><View style={styles.accountRowCopy}><Text style={styles.settingsText}>{title}</Text><Text style={styles.accountRowDetail}>{detail}</Text></View><Ionicons name="chevron-forward" size={18} color={C.muted} /></Pressable>)}</View><View style={styles.valuesSection}><Text style={styles.lookingLabel}>THE BONUS HUMAN PROMISE</Text><Text style={styles.body}>The pet’s wellbeing comes first. Pet Owners stay responsible. Bonus Humans give time because the Connection itself is valuable.</Text></View></ScrollView></View>;
}

const tabs = [
  { id: 'discover', label: 'Discover', icon: 'search-outline', activeIcon: 'search' },
  { id: 'connections', label: 'Connections', icon: 'people-outline', activeIcon: 'people' },
  { id: 'pets', label: 'Pets', icon: 'paw-outline', activeIcon: 'paw' },
  { id: 'feed', label: 'Feed', icon: 'images-outline', activeIcon: 'images' },
];
const INITIAL_CONNECTION = { active: true, stage: 0, event: null, recurring: null, endReason: '' };

export default function App({ initialConnection = INITIAL_CONNECTION }) {
  const [tab, setTab] = useState(initialConnection.active ? 'connections' : 'discover');
  const [detail, setDetail] = useState(null);
  const [mode, setMode] = useState('owner');
  const [profiles, setProfiles] = useState(initialProfiles);
  const [decisions, setDecisions] = useState({});
  const [connection, setConnection] = useState(initialConnection);
  const [messages, setMessages] = useState([{ id: 1, who: 'Haley & Ari', text: 'We would love to meet you and Zuki somewhere quiet.' }, { id: 2, who: 'Mike', text: 'That sounds great. She does best with slow introductions.' }, { id: 3, who: 'Activity', text: 'Mike and Haley & Ari connected. Next up: plan a Meet & Greet.', system: true }]);
  const setDecision = (id, status) => setDecisions(current => { const next = { ...current }; if (status) next[id] = status; else delete next[id]; return next; });
  const selectTab = id => { setDetail(null); setTab(id); };
  const openAccount = () => setDetail({ kind: 'account' });
  const openPerson = (profile, resultSet = profiles, profileIndex = 0) => setDetail({ kind: 'person', profile, resultSet, profileIndex });
  const navigatePerson = amount => setDetail(current => { const nextIndex = (current.profileIndex + amount + current.resultSet.length) % current.resultSet.length; return { ...current, profileIndex: nextIndex, profile: current.resultSet[nextIndex] }; });
  const content = detail?.kind === 'person' ? <PersonProfile profile={detail.profile} profiles={detail.resultSet} profileIndex={detail.profileIndex} onNavigate={navigatePerson} onBack={() => setDetail(null)} decision={decisions[detail.profile.id]} setDecision={setDecision} />
    : detail?.kind === 'account' ? <Account mode={mode} onModeChange={setMode} onBack={() => setDetail(null)} profile={profiles.find(profile => profile.id === 'mike')} onSaveProfile={updated => setProfiles(current => current.map(profile => profile.id === updated.id ? updated : profile))} onManagePets={() => selectTab('pets')} />
    : detail?.kind === 'pet' ? <ZukiDetail onBack={() => setDetail(null)} onAccount={openAccount} />
    : tab === 'discover' ? <Discovery mode={mode} profiles={profiles} decisions={decisions} setDecision={setDecision} onOpen={openPerson} onAccount={openAccount} />
    : tab === 'pets' ? <PetsHub mode={mode} onAccount={openAccount} />
    : tab === 'connections' ? <Connections onAccount={openAccount} decisions={decisions} setDecision={setDecision} onOpen={openPerson} profiles={profiles} connection={connection} setConnection={setConnection} messages={messages} setMessages={setMessages} onOpenPet={() => setDetail({ kind: 'pet' })} />
    : <Feed onAccount={openAccount} />;
  return <SafeAreaView style={styles.safe}><StatusBar barStyle="dark-content" backgroundColor={C.paper} /><View style={styles.appShell}>{content}{!detail && <View style={styles.tabBar}>{tabs.map(({ id, icon, activeIcon, label }) => <Pressable accessibilityRole="button" accessibilityLabel={`${label} tab`} key={id} onPress={() => selectTab(id)} style={styles.tab}><Ionicons name={tab === id ? activeIcon : icon} size={22} color={tab === id ? C.sage : '#7E8982'} style={styles.tabIcon} /><Text style={[styles.tabLabel, tab === id && styles.tabActive]}>{label}</Text>{tab === id && <View style={styles.tabDot} />}</Pressable>)}</View>}</View></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.paper }, flex: { flex: 1 }, appShell: { flex: 1, width: '100%', maxWidth: 520, alignSelf: 'center', backgroundColor: C.paper },
  screen: { paddingHorizontal: 20, paddingBottom: 34 }, screenFlush: { paddingBottom: 34 },
  topBar: { height: 58, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: C.line, backgroundColor: C.paper },
  brandMark: { width: 29, height: 29, borderRadius: 10, backgroundColor: C.sage, alignItems: 'center', justifyContent: 'center' }, brandMarkText: { color: C.white, fontSize: 16, fontWeight: '800' },
  topTitle: { flex: 1, textAlign: 'center', color: C.ink, fontSize: 17, fontWeight: '800', letterSpacing: -.2 }, topAction: { width: 29, alignItems: 'flex-end' },
  avatarMini: { width: 30, height: 30, borderRadius: 15, backgroundColor: C.clayLight, justifyContent: 'center', alignItems: 'center' }, avatarMiniText: { color: C.clay, fontWeight: '800' }, back: { width: 29, color: C.ink, fontSize: 38, lineHeight: 38 },
  discoverIntro: { marginTop: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, sectionTitle: { marginTop: 26, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }, sectionTitleCopy: { flexShrink: 1, minWidth: 0 },
  eyebrow: { color: C.clay, fontSize: 11, letterSpacing: 1.4, fontWeight: '800', marginBottom: 5 }, h1: { color: C.ink, fontSize: 30, lineHeight: 35, fontWeight: '800', letterSpacing: -.8 }, h2: { color: C.ink, fontSize: 23, lineHeight: 28, fontWeight: '800', letterSpacing: -.5 }, h3: { color: C.ink, fontSize: 17, lineHeight: 22, fontWeight: '800' },
  lede: { color: C.muted, fontSize: 15, lineHeight: 22, marginTop: 6, marginBottom: 18 }, body: { color: C.muted, fontSize: 14, lineHeight: 21 },
  pill: { backgroundColor: C.sageLight, borderRadius: 99, paddingVertical: 7, paddingHorizontal: 11, alignSelf: 'flex-start' }, pillWarm: { backgroundColor: C.clayLight }, pillText: { color: C.sage, fontWeight: '700', fontSize: 11 }, pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginVertical: 14 }, statusLabel: { borderRadius: 99, paddingVertical: 7, paddingHorizontal: 11, alignSelf: 'flex-start', backgroundColor: '#EEECE6' }, statusLabel_success: { backgroundColor: C.sageLight }, statusLabel_warning: { backgroundColor: '#FFF2D8' }, statusLabelText: { color: C.muted, fontSize: 11, fontWeight: '800' }, statusLabelText_success: { color: C.sage }, statusLabelText_warning: { color: '#946B20' },
  discoveryCard: { backgroundColor: C.white, borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: C.line, ...Platform.select({ web: { boxShadow: '0 8px 28px rgba(39,51,45,.09)' }, default: { elevation: 3 } }) },
  discoveryImage: { width: '100%', height: 300, resizeMode: 'cover' }, typeBadge: { position: 'absolute', top: 16, left: 16, backgroundColor: 'rgba(39,51,45,.86)', paddingVertical: 7, paddingHorizontal: 10, borderRadius: 8 }, typeBadgeText: { color: C.white, fontSize: 10, fontWeight: '800', letterSpacing: 1.2 }, cardBody: { padding: 18 }, cardName: { fontSize: 25, color: C.ink, fontWeight: '800' },
  location: { color: C.muted, fontSize: 13, lineHeight: 20 }, cardIntro: { color: C.ink, fontSize: 15, lineHeight: 22, marginTop: 12 }, lookingBox: { backgroundColor: C.paper, padding: 14, borderRadius: 14, marginBottom: 14 }, lookingLabel: { color: C.clay, fontSize: 10, fontWeight: '800', letterSpacing: 1.15, marginBottom: 5 }, lookingText: { color: C.ink, fontSize: 14, lineHeight: 20, fontWeight: '600' },
  button: { minHeight: 48, borderRadius: 14, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', flexGrow: 1 }, buttonSmall: { flexGrow: 0, minHeight: 42, marginTop: 12 }, button_primary: { backgroundColor: C.sage }, button_ghost: { backgroundColor: C.white, borderWidth: 1.5, borderColor: C.sage }, button_light: { backgroundColor: C.sageLight }, button_danger: { backgroundColor: C.clay }, buttonText: { fontSize: 14, fontWeight: '800' }, buttonText_primary: { color: C.white }, buttonText_ghost: { color: C.sage }, buttonText_light: { color: C.sage }, buttonText_danger: { color: C.white }, actionRow: { flexDirection: 'row', gap: 12, marginTop: 16 }, centerHint: { textAlign: 'center', color: C.muted, fontSize: 11, marginTop: 12 },
  profileHero: { width: '100%', height: 330, resizeMode: 'cover' }, profileOverlayBadge: { position: 'absolute', top: 18, left: 18, backgroundColor: 'rgba(39,51,45,.86)', padding: 9, borderRadius: 8 }, profileContent: { padding: 20 }, profileBio: { color: C.ink, fontSize: 16, lineHeight: 24, marginTop: 14 }, divider: { height: 1, backgroundColor: C.line, marginVertical: 14 }, fact: { marginBottom: 22 }, factTitle: { color: C.ink, fontSize: 15, fontWeight: '800', marginBottom: 5 }, promptRow: { borderTopWidth: 1, borderTopColor: C.line, paddingVertical: 16 }, promptQ: { color: C.clay, fontSize: 11, fontWeight: '800', letterSpacing: .6, marginBottom: 7 }, promptA: { color: C.ink, fontSize: 16, lineHeight: 23, fontWeight: '600' }, safetyNote: { color: C.muted, fontSize: 12, textAlign: 'center', lineHeight: 18, margin: 14 },
  segment: { flexDirection: 'row', backgroundColor: '#EEECE6', borderRadius: 12, padding: 4, marginTop: 16 }, segmentItem: { flex: 1, padding: 10, alignItems: 'center', borderRadius: 9 }, segmentActive: { backgroundColor: C.white }, segmentText: { color: C.muted, fontSize: 13, fontWeight: '700' }, segmentTextActive: { color: C.ink },
  petHero: { height: 300, width: '100%', borderRadius: 22, marginTop: 18, resizeMode: 'cover' }, petNameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 }, trustedBadge: { backgroundColor: C.clayLight, borderRadius: 99, padding: 10 }, trustedBadgeText: { color: C.clay, fontSize: 11, fontWeight: '800' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 18, marginBottom: 16 }, miniCard: { width: '47%', borderTopWidth: 1, borderTopColor: C.line, paddingVertical: 14 }, miniIcon: { color: C.clay, fontSize: 20, marginBottom: 8 }, miniTitle: { color: C.ink, fontSize: 14, fontWeight: '800' }, miniText: { color: C.muted, fontSize: 12, lineHeight: 17, marginTop: 3 }, infoNote: { borderLeftWidth: 3, borderLeftColor: C.clay, backgroundColor: C.clayLight, padding: 14, marginTop: 16, borderRadius: 8 }, infoNoteTitle: { color: C.clay, fontWeight: '800', marginBottom: 4 },
  peopleStrip: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 14 }, personCircle: { width: 90, alignItems: 'center' }, petCircle: { width: 82, alignItems: 'center' }, personCircleImage: { width: 64, height: 64, borderRadius: 32, resizeMode: 'cover', borderWidth: 3, borderColor: C.white }, personName: { color: C.ink, fontSize: 11, fontWeight: '800', marginTop: 6, textAlign: 'center' }, personRole: { color: C.muted, fontSize: 9, textAlign: 'center' }, relationshipLine: { width: 23, height: 1.5, backgroundColor: C.gold, marginBottom: 28 },
  relationshipStatus: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: C.line, paddingVertical: 18, marginTop: 14 }, timeline: { flexDirection: 'row', marginTop: 20, marginBottom: 6 }, timelineStep: { flex: 1, alignItems: 'center', position: 'relative' }, timelineDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#D9DDD9', alignItems: 'center', justifyContent: 'center', zIndex: 2 }, timelineDotActive: { backgroundColor: C.sage }, timelineCheck: { color: C.white, fontSize: 12, fontWeight: '800' }, timelineLabel: { color: '#939A95', fontSize: 9, textAlign: 'center', marginTop: 6 }, timelineBar: { position: 'absolute', left: '63%', top: 11, height: 2, width: '74%', backgroundColor: '#D9DDD9' }, timelineBarActive: { backgroundColor: C.sage },
  availabilityCard: { flexDirection: 'row', backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 14, marginBottom: 12, alignItems: 'center' }, dateBox: { backgroundColor: C.clayLight, width: 56, height: 62, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }, dateDay: { color: C.clay, fontSize: 10, fontWeight: '800' }, dateNum: { color: C.ink, fontSize: 23, fontWeight: '800' }, availText: { flex: 1, marginLeft: 13 }, requestCard: { backgroundColor: C.sageLight, borderRadius: 16, padding: 16 }, requestTitle: { color: C.ink, fontSize: 15, fontWeight: '800', marginBottom: 3 }, confirmed: { backgroundColor: C.sageLight, borderRadius: 16, padding: 15, flexDirection: 'row', alignItems: 'center' }, confirmedIcon: { width: 30, height: 30, borderRadius: 15, backgroundColor: C.sage, color: C.white, textAlign: 'center', lineHeight: 30, fontWeight: '800', marginRight: 11 }, quickGrid: { flexDirection: 'row', gap: 10, marginTop: 12 },
  composer: { flexDirection: 'row', backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 17, padding: 12, alignItems: 'center', marginBottom: 18 }, input: { flex: 1, minHeight: 35, maxHeight: 90, color: C.ink, fontSize: 14, paddingHorizontal: 10, paddingVertical: 7 }, send: { width: 32, height: 32, borderRadius: 16, backgroundColor: C.sage, alignItems: 'center', justifyContent: 'center' }, sendText: { color: C.white, fontSize: 20, fontWeight: '800', marginTop: -2 },
  post: { backgroundColor: C.white, borderRadius: 18, borderWidth: 1, borderColor: C.line, padding: 16, marginBottom: 14 }, postHeader: { flexDirection: 'row', alignItems: 'center' }, postAvatar: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' }, postAvatarText: { color: C.white, fontWeight: '800' }, postMeta: { flex: 1, marginLeft: 9 }, postName: { color: C.ink, fontWeight: '800', fontSize: 13 }, postWhen: { color: C.muted, fontSize: 10, marginTop: 2 }, postText: { color: C.ink, fontSize: 15, lineHeight: 22, marginVertical: 13 }, postImage: { height: 245, width: '100%', borderRadius: 13, resizeMode: 'cover' }, postFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 12, borderRadius: 12, alignSelf: 'flex-start', paddingVertical: 5, paddingHorizontal: 7 }, postFooterLiked: { backgroundColor: C.clayLight }, postHeart: { color: C.clay, fontSize: 21 }, postHeartLiked: { color: C.clay }, postFooterText: { color: C.muted, fontSize: 10, marginLeft: 7 },
  careHero: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 18 }, careAvatar: { width: 74, height: 74, borderRadius: 18, resizeMode: 'cover' }, todayCard: { backgroundColor: C.navy, borderRadius: 18, padding: 16 }, todayHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }, progress: { color: C.white, backgroundColor: 'rgba(255,255,255,.15)', padding: 9, borderRadius: 10, fontWeight: '800' }, checkRow: { flexDirection: 'row', alignItems: 'center', minHeight: 44, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,.13)' }, checkbox: { width: 22, height: 22, borderRadius: 7, borderWidth: 1.5, borderColor: 'rgba(255,255,255,.6)', alignItems: 'center', justifyContent: 'center' }, checkboxDone: { backgroundColor: C.gold, borderColor: C.gold }, checkmark: { color: C.navy, fontWeight: '900' }, checkTime: { color: '#D8E1E5', fontSize: 11, width: 68, marginLeft: 10 }, checkLabel: { color: C.white, fontSize: 13, flex: 1 }, strike: { textDecorationLine: 'line-through', opacity: .55 }, careSection: { flexDirection: 'row', backgroundColor: C.white, borderBottomWidth: 1, borderBottomColor: C.line, paddingVertical: 17 }, careEmergency: { backgroundColor: '#FFF9F6', paddingHorizontal: 10 }, careIcon: { width: 35, height: 35, borderRadius: 11, backgroundColor: C.sageLight, alignItems: 'center', justifyContent: 'center' }, careIconText: { color: C.sage, fontWeight: '800', fontSize: 16 }, careCopy: { flex: 1, marginLeft: 12 }, careBody: { color: C.muted, fontSize: 13, lineHeight: 20 },
  myHeader: { flexDirection: 'row', alignItems: 'center', marginTop: 22 }, myImage: { width: 92, height: 92, borderRadius: 24, resizeMode: 'cover' }, myCopy: { flex: 1, marginLeft: 16, gap: 4 }, quoteCard: { backgroundColor: C.sageLight, borderRadius: 18, padding: 18, marginTop: 18 }, quote: { color: C.sage, fontSize: 17, lineHeight: 25, fontWeight: '700' }, connectionCard: { flexDirection: 'row', backgroundColor: C.white, padding: 12, borderRadius: 16, borderWidth: 1, borderColor: C.line, alignItems: 'center' }, connectionImage: { width: 58, height: 58, borderRadius: 14, resizeMode: 'cover' }, connectionCopy: { flex: 1, marginLeft: 12 }, tinyStatus: { flexDirection: 'row', alignItems: 'center', marginTop: 5 }, onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: C.sage, marginRight: 5 }, tinyStatusText: { color: C.sage, fontSize: 10, fontWeight: '700' }, chevron: { color: C.muted, fontSize: 26 }, settingsRow: { flexDirection: 'row', minHeight: 52, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: C.line }, settingsText: { flex: 1, color: C.ink, fontSize: 14, fontWeight: '600' }, valuesSection: { borderTopWidth: 1, borderTopColor: C.line, paddingVertical: 18, marginTop: 22 },
  compactMode: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: C.sageLight, borderRadius: 99, paddingVertical: 7, paddingHorizontal: 10, marginTop: 10, marginBottom: 12 }, modeStatusDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: C.sage, marginRight: 7 }, compactModeText: { color: C.sage, fontWeight: '700', fontSize: 10 }, modeSwitchText: { color: C.clay, fontWeight: '800', fontSize: 10, marginLeft: 8 },
  browseControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }, emptyState: { backgroundColor: C.white, borderRadius: 18, padding: 22, alignItems: 'center', gap: 8, borderWidth: 1, borderColor: C.line, marginTop: 4 }, emptyActions: { flexDirection: 'row', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }, decisionBadge: { position: 'absolute', top: 16, right: 16, backgroundColor: C.clay, borderRadius: 8, padding: 7 }, decisionBadgeText: { color: C.white, fontSize: 8, fontWeight: '900', letterSpacing: .7 },
  gallery: { position: 'relative' }, galleryPosition: { height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, backgroundColor: C.white }, galleryDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#C9CEC9' }, galleryDotActive: { width: 14, backgroundColor: C.sage },
  filterCategoryRow: { gap: 8, paddingBottom: 14, paddingRight: 12 }, filterCategoryChip: { minHeight: 38, flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, borderRadius: 99, borderWidth: 1, borderColor: C.line, backgroundColor: C.white }, filterCategoryChipActive: { backgroundColor: C.sage, borderColor: C.sage }, filterCategoryText: { color: C.sage, fontSize: 11, fontWeight: '800' }, filterCategoryTextActive: { color: C.white }, sheetLayer: { flex: 1, justifyContent: 'flex-end' }, sheetScrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(39,51,45,.36)' }, filterSheet: { maxHeight: '82%', backgroundColor: C.paper, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingBottom: 18, ...Platform.select({ web: { boxShadow: '0 -10px 32px rgba(39,51,45,.18)' }, default: { elevation: 10 } }) }, sheetHandle: { width: 42, height: 4, borderRadius: 2, backgroundColor: '#C9CEC9', alignSelf: 'center', marginTop: 10 }, sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: C.line }, sheetClose: { width: 38, height: 38, borderRadius: 19, backgroundColor: C.white, alignItems: 'center', justifyContent: 'center' }, sheetContent: { paddingHorizontal: 20, paddingVertical: 16 }, sheetActions: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, paddingTop: 12, borderTopWidth: 1, borderTopColor: C.line }, distanceBlock: { paddingVertical: 4, marginBottom: 8 }, distanceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, distanceValue: { color: C.sage, fontSize: 16, fontWeight: '800' }, sliderTrack: { height: 28, borderRadius: 14, backgroundColor: C.sageLight, marginTop: 12, justifyContent: 'center' }, sliderFill: { position: 'absolute', left: 0, height: 6, borderRadius: 3, backgroundColor: C.sage }, sliderThumb: { position: 'absolute', marginLeft: -11, width: 22, height: 22, borderRadius: 11, backgroundColor: C.white, borderWidth: 3, borderColor: C.sage, elevation: 2 }, sliderLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }, sliderLabel: { color: C.muted, fontSize: 9 }, filterHelp: { color: C.muted, fontSize: 11, marginBottom: 8 }, filterChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }, filterChip: { paddingVertical: 9, paddingHorizontal: 12, borderRadius: 99, borderWidth: 1, borderColor: C.line, backgroundColor: C.paper }, filterChipActive: { backgroundColor: C.sage, borderColor: C.sage }, filterChipText: { color: C.muted, fontSize: 12, fontWeight: '700' }, filterChipTextActive: { color: C.white }, scheduleRow: { minHeight: 46, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: C.line }, scheduleDay: { flex: 1, color: C.ink, fontSize: 13, fontWeight: '700' }, scheduleTimes: { flexDirection: 'row', gap: 7 }, pillRowCompact: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 7 }, attributeList: { borderTopWidth: 1, borderTopColor: C.line }, attributeRow: { borderBottomWidth: 1, borderBottomColor: C.line, paddingVertical: 14 }, attributeTitle: { color: C.ink, fontWeight: '800', fontSize: 13 },
  listLabel: { color: C.muted, fontSize: 10, fontWeight: '800', letterSpacing: 1.2, marginTop: 18, marginBottom: 8 }, petListCard: { flexDirection: 'row', backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 17, padding: 12, marginBottom: 12, alignItems: 'center' }, petListImage: { width: 74, height: 74, borderRadius: 16, resizeMode: 'cover' }, cardLink: { color: C.sage, fontSize: 11, fontWeight: '800', marginTop: 6 },
  connectionTabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.line, marginTop: 10 }, connectionTab: { flex: 1, paddingVertical: 12, alignItems: 'center' }, connectionTabActive: { borderBottomWidth: 2, borderBottomColor: C.clay }, connectionTabText: { color: C.muted, fontSize: 10, fontWeight: '700' }, connectionTabTextActive: { color: C.ink }, connectedCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 18, padding: 13 }, connectedImage: { width: 76, height: 90, borderRadius: 15, resizeMode: 'cover' }, connectedTitleRow: { flexDirection: 'row', justifyContent: 'space-between' }, connectedStatus: { color: C.sage, fontSize: 11, fontWeight: '800', marginTop: 6 }, messagePreview: { color: C.muted, fontSize: 12, marginTop: 7, fontStyle: 'italic' }, unreadDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: C.clay, alignItems: 'center', justifyContent: 'center' }, unreadText: { color: C.white, fontWeight: '800', fontSize: 10 }, decisionListCard: { backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 17, padding: 12, marginBottom: 12 }, decisionProfileLink: { flexDirection: 'row', alignItems: 'center' }, decisionImage: { width: 68, height: 72, borderRadius: 14, resizeMode: 'cover' }, connectionSummary: { flexDirection: 'row', backgroundColor: C.sageLight, padding: 12, alignItems: 'center' }, chat: { padding: 18, gap: 12 }, bubble: { maxWidth: '82%', padding: 13, borderRadius: 16 }, bubbleMine: { alignSelf: 'flex-end', backgroundColor: C.sage }, bubbleTheirs: { alignSelf: 'flex-start', backgroundColor: C.white, borderWidth: 1, borderColor: C.line }, bubbleWho: { fontSize: 9, fontWeight: '800', color: C.clay, marginBottom: 4 }, bubbleText: { color: C.ink, fontSize: 14, lineHeight: 20 }, chatComposer: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderTopColor: C.line, backgroundColor: C.white, alignItems: 'center', gap: 8 },
  detailSegment: { marginHorizontal: 20 }, timeFields: { flexDirection: 'row', gap: 10 }, timeField: { flex: 1 }, eventCopy: { flex: 1 }, regularActions: { gap: 10 }, inlineActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 6 }, stageActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12 }, activityBubble: { alignSelf: 'center', backgroundColor: C.sageLight, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14, maxWidth: '92%' }, activityText: { color: C.sage, fontSize: 11, lineHeight: 16, textAlign: 'center', fontWeight: '700' }, endConnection: { alignSelf: 'center', padding: 14, marginTop: 28 }, endConnectionText: { color: C.clay, fontSize: 13, fontWeight: '800' }, dialogLayer: { flex: 1, backgroundColor: 'rgba(39,51,45,.42)', alignItems: 'center', justifyContent: 'center', padding: 20 }, dialog: { width: '100%', maxWidth: 440, backgroundColor: C.paper, borderRadius: 22, padding: 20 }, reportLink: { paddingVertical: 14, alignSelf: 'flex-start' },
  breadcrumb: { backgroundColor: C.sageLight, borderRadius: 10, padding: 9, marginTop: 14 }, breadcrumbText: { color: C.sage, fontSize: 10, fontWeight: '700' }, modeToggle: { flexDirection: 'row', gap: 10 }, modeChoice: { flex: 1, borderWidth: 1, borderColor: C.line, borderRadius: 15, padding: 14, backgroundColor: C.white }, modeChoiceActive: { borderColor: C.sage, backgroundColor: C.sageLight }, modeChoiceTitle: { color: C.ink, fontWeight: '800', fontSize: 13 }, modeChoiceTitleActive: { color: C.sage }, modeChoiceText: { color: C.muted, fontSize: 10, marginTop: 4 }, fieldLabel: { color: C.muted, fontSize: 11, fontWeight: '800', marginTop: 10, marginBottom: 5 }, field: { backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 12, minHeight: 44, paddingHorizontal: 12, color: C.ink }, fieldMultiline: { minHeight: 82, paddingTop: 11, textAlignVertical: 'top' }, photoManager: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 }, photoThumb: { width: 72, height: 72, borderRadius: 13, resizeMode: 'cover' }, addPhoto: { width: 92, height: 72, borderRadius: 13, borderWidth: 1, borderStyle: 'dashed', borderColor: C.sage, alignItems: 'center', justifyContent: 'center' }, addPhotoPlus: { color: C.sage, fontSize: 20 }, addPhotoText: { color: C.sage, fontSize: 8, fontWeight: '800' }, preferenceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderBottomWidth: 1, borderColor: C.line, paddingVertical: 14, marginBottom: 15 }, switchTrack: { width: 44, height: 25, borderRadius: 13, backgroundColor: '#CCD2CE', padding: 3 }, switchTrackOn: { backgroundColor: C.sage }, switchKnob: { width: 19, height: 19, borderRadius: 10, backgroundColor: C.white }, switchKnobOn: { marginLeft: 19 }, galleryIntro: { color: C.muted, fontSize: 14, lineHeight: 21, marginTop: 20 }, gallerySection: { backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 15, gap: 12 }, iconButtonRow: { flexDirection: 'row', gap: 10 }, galleryIconButton: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: C.line, backgroundColor: C.white, alignItems: 'center', justifyContent: 'center' }, galleryIconButtonPrimary: { backgroundColor: C.sage, borderColor: C.sage }, galleryIcon: { color: C.ink, fontSize: 24, fontWeight: '800' }, galleryPhoto: { width: '100%', height: 230, borderRadius: 14, resizeMode: 'cover' }, galleryProfileImage: { width: '100%', height: 250, resizeMode: 'cover' },
  accountRows: { borderTopWidth: 1, borderTopColor: C.line }, accountRow: { flexDirection: 'row', alignItems: 'center', minHeight: 64, borderBottomWidth: 1, borderBottomColor: C.line }, accountRowCopy: { flex: 1 }, accountRowDetail: { color: C.muted, fontSize: 11, marginTop: 3 },
  tabBar: { height: 68, flexDirection: 'row', borderTopWidth: 1, borderTopColor: C.line, backgroundColor: C.white, paddingBottom: Platform.OS === 'ios' ? 5 : 0 }, tab: { flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' }, tabIcon: { height: 23 }, tabLabel: { color: '#7E8982', fontSize: 9, marginTop: 2, fontWeight: '700' }, tabActive: { color: C.sage }, tabDot: { position: 'absolute', bottom: 4, width: 4, height: 4, borderRadius: 2, backgroundColor: C.clay },
});
