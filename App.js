import React, { useMemo, useState } from 'react';
import {
  Image,
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

const profiles = [
  {
    id: 'haley', role: 'bonus', type: 'BONUS HUMANS', name: 'Haley & Ari', location: 'North Portland · 2.4 mi', distance: 2.4, image: peopleImage,
    photos: [peopleImage, peopleWalkImage],
    intro: 'Homebody adventurers hoping to become trusted aunties to a small dog nearby.',
    looking: 'A steady, long-term relationship — weeknight hangs and occasional weekends.',
    highlights: ['Senior-dog experience', 'Quiet home', 'Free Thu evenings'],
    attributes: { Location: ['2.4 miles away', 'North Portland'], Availability: ['Thursday evenings', 'Weekends'], Experience: ['Senior pets', 'Rescue volunteer'], 'Home environment': ['Apartment', 'No yard', 'Quiet home'] },
    filterData: { schedule: ['Thursday PM', 'Saturday PM', 'Sunday PM'], experience: ['Senior dog care', 'Medication / pills', 'Special diets'], home: ['Apartment', 'No yard'] },
    facts: [
      ['Our pet experience', 'Haley grew up with terriers; Ari volunteered with senior rescues for three years.'],
      ['Why this relationship', 'We miss the everyday companionship of a dog and want to invest in one bond, not rotate through pet-sitting gigs.'],
      ['Why no pet right now', 'Our lease and travel rhythm make full-time ownership a poor fit, but regular local time feels sustainable.'],
      ['Availability', 'Thursday evenings, one weekend afternoon most weeks, and occasional overnights after trust is built.'],
      ['The relationship we hope for', 'A familiar dog who is genuinely excited to see us — and people we can communicate openly with.'],
    ],
    prompts: [['A small joy', 'Slow neighborhood walks with a coffee.'], ['We are known for', 'Following instructions and sending excellent photo updates.']],
  },
  {
    id: 'mike', role: 'owner', type: 'PET OWNER', name: 'Mike + Zuki', location: 'Alberta Arts · 3.1 mi', distance: 3.1, image: mikeImage,
    photos: [mikeImage, zukiImage, zukiWalkImage],
    intro: 'Zuki’s person for 16 years. Thoughtful, direct, and looking to widen her circle of trusted people.',
    looking: 'Someone patient who values a lasting bond with a gentle senior dog.',
    highlights: ['Senior dog', 'Low-key visits', 'Clear care plan'],
    attributes: { Location: ['3.1 miles away', 'Alberta Arts'], Availability: ['Thursday evenings', 'Weekends'], Experience: ['Senior pet household'], 'Home environment': ['Apartment', 'No yard'] },
    filterData: { schedule: ['Thursday PM', 'Saturday AM', 'Saturday PM', 'Sunday AM'], experience: ['Senior dog care', 'Medication / pills', 'Mobility assistance'], home: ['Apartment', 'No yard'] },
    facts: [
      ['About us', 'Zuki and I are a quiet little household. She has been my constant companion since she was a puppy.'],
      ['Why a bonus human', 'I want Zuki to have another safe, loving relationship — not simply backup care when I am busy.'],
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
    facts: [['Our pet experience', 'Twelve years caring for an easygoing lab mix.'], ['Why this relationship', 'I miss the rhythm of walks and companionship without being ready to adopt again.'], ['Why no pet right now', 'I travel for work several times each quarter.'], ['Availability', 'Saturday and Sunday mornings, plus some Friday evenings.'], ['The relationship we hope for', 'One nearby dog and household I can know well over time.']],
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
function SectionTitle({ eyebrow, title, right }) { return <View style={styles.sectionTitle}><View><Text style={styles.eyebrow}>{eyebrow}</Text><Text style={styles.h2}>{title}</Text></View>{right}</View>; }
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
  return <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel} accessibilityState={{ selected }} onPress={onPress} style={[styles.filterChip, selected && styles.filterChipActive]}><Text style={[styles.filterChipText, selected && styles.filterChipTextActive]}>{label}</Text></Pressable>;
}

const DEFAULT_FILTERS = { radius: 10, schedule: [], experience: [], home: [] };
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const EXPERIENCE_OPTIONS = ['Puppy care', 'Senior dog care', 'Medication / pills', 'Injections / shots', 'Special diets', 'Mobility assistance', 'Separation anxiety', 'Behavioral needs'];
const HOME_OPTIONS = ['Apartment', 'House', 'Yard', 'No yard', 'Has dogs', 'Has cats'];

function DistanceSlider({ value, onChange }) {
  const [width, setWidth] = useState(1);
  const updateFromTouch = event => {
    const x = Math.max(0, Math.min(width, event.nativeEvent.locationX || 0));
    onChange(Math.round(1 + (x / width) * 99));
  };
  const adjust = direction => onChange(Math.max(1, Math.min(100, value + direction * 10)));
  const percentage = ((value - 1) / 99) * 100;
  return <View style={styles.distanceBlock}>
    <View style={styles.distanceHeader}><Text style={styles.factTitle}>Distance / radius</Text><Text style={styles.distanceValue}>{value} {value === 1 ? 'mile' : 'miles'}</Text></View>
    <View
      accessibilityRole="adjustable"
      accessibilityLabel="Distance radius"
      accessibilityValue={{ min: 1, max: 100, now: value, text: `${value} ${value === 1 ? 'mile' : 'miles'}` }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={event => adjust(event.nativeEvent.actionName === 'increment' ? 1 : -1)}
      onLayout={event => setWidth(event.nativeEvent.layout.width)}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
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

function Filters({ filters, setFilters, onDone }) {
  const toggle = (key, value) => setFilters(current => ({ ...current, [key]: current[key].includes(value) ? current[key].filter(item => item !== value) : [...current[key], value] }));
  return <View style={styles.flex}><TopBar title="Discover filters" back onBack={onDone} />
    <ScrollView contentContainerStyle={styles.screen}>
      <SectionTitle eyebrow="LOCATION" title="How nearby?" />
      <DistanceSlider value={filters.radius} onChange={radius => setFilters(current => ({ ...current, radius }))} />
      <View style={styles.filterGroup}><Text style={styles.eyebrow}>SCHEDULE</Text><Text style={styles.filterHelp}>Choose every time that could work.</Text>{DAYS.map(day => <View key={day} style={styles.scheduleRow}><Text style={styles.scheduleDay}>{day}</Text><View style={styles.scheduleTimes}>{['AM', 'PM'].map(period => { const value = `${day} ${period}`; return <FilterChip key={value} label={period} accessibilityLabel={value} selected={filters.schedule.includes(value)} onPress={() => toggle('schedule', value)} />; })}</View></View>)}</View>
      <View style={styles.filterGroup}><Text style={styles.eyebrow}>EXPERIENCE</Text><Text style={styles.filterHelp}>Select all experience that matters.</Text><View style={styles.filterChips}>{EXPERIENCE_OPTIONS.map(value => <FilterChip key={value} label={value} selected={filters.experience.includes(value)} onPress={() => toggle('experience', value)} />)}</View></View>
      <View style={styles.filterGroup}><Text style={styles.eyebrow}>HOME ENVIRONMENT</Text><Text style={styles.filterHelp}>Select all requirements that apply.</Text><View style={styles.filterChips}>{HOME_OPTIONS.map(value => <FilterChip key={value} label={value} selected={filters.home.includes(value)} onPress={() => toggle('home', value)} />)}</View></View>
      <View style={styles.actionRow}><Button tone="light" label="Clear all" onPress={() => setFilters({ ...DEFAULT_FILTERS })} /><Button label="Show profiles" onPress={onDone} /></View>
      <Text style={styles.safetyNote}>Prototype filters use general preferences—not precise location tracking.</Text>
    </ScrollView>
  </View>;
}

function Discovery({ mode, onModeChange, decisions, setDecision, onOpen, onAccount }) {
  const [index, setIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS });
  const expectedRole = mode === 'owner' ? 'bonus' : 'owner';
  const visible = profiles.filter(p => p.role === expectedRole && p.distance <= filters.radius && filters.schedule.every(value => p.filterData.schedule.includes(value)) && filters.experience.every(value => p.filterData.experience.includes(value)) && filters.home.every(value => p.filterData.home.includes(value)));
  const p = visible[index % Math.max(visible.length, 1)];
  const move = amount => setIndex((index + amount + visible.length) % visible.length);
  const changeDecision = status => { if (p) setDecision(p.id, decisions[p.id] === status ? null : status); };
  const activeFilterCount = filters.schedule.length + filters.experience.length + filters.home.length + (filters.radius !== DEFAULT_FILTERS.radius ? 1 : 0);
  const clearFilters = () => { setFilters({ ...DEFAULT_FILTERS }); setIndex(0); };
  const increaseDistance = () => { setFilters(current => ({ ...current, radius: Math.min(100, current.radius + 10) })); setIndex(0); };
  if (showFilters) return <Filters filters={filters} setFilters={setFilters} onDone={() => { setShowFilters(false); setIndex(0); }} />;
  return <View style={styles.flex}>
    <TopBar onAccount={onAccount} />
    <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.discoverIntro}><View><Text style={styles.eyebrow}>DISCOVER</Text><Text style={styles.h1}>Find their people.</Text></View><Pressable accessibilityRole="button" onPress={() => setShowFilters(true)} style={styles.filterButton}><Text style={styles.filterButtonText}>⌁ Filters{activeFilterCount ? ` · ${activeFilterCount}` : ''}</Text></Pressable></View>
      <Pressable accessibilityRole="button" accessibilityLabel={`Switch mode. Currently ${mode === 'owner' ? 'Pet Owner' : 'Bonus Human'} mode`} onPress={() => onModeChange(mode === 'owner' ? 'bonus' : 'owner')} style={styles.compactMode}><View style={styles.modeStatusDot} /><Text style={styles.compactModeText}>{mode === 'owner' ? 'Pet Owner mode · viewing bonus humans' : 'Bonus Human mode · viewing pets & owners'}</Text><Text style={styles.modeSwitchText}>Switch</Text></Pressable>
      {!p ? <View style={styles.emptyState}><Text style={styles.h3}>No profiles match these filters</Text><Text style={styles.body}>Try expanding beyond the current {filters.radius}-mile radius or start again with all filters cleared.</Text><View style={styles.emptyActions}><Button small label="Increase distance" disabled={filters.radius === 100} onPress={increaseDistance} /><Button small tone="light" label="Clear filters" onPress={clearFilters} /></View></View> : <>
        <View style={styles.discoveryCard}><PhotoGallery photos={p.photos} style={styles.discoveryImage} /><View style={styles.typeBadge}><Text style={styles.typeBadgeText}>{p.type}</Text></View>{decisions[p.id] && <View style={styles.decisionBadge}><Text style={styles.decisionBadgeText}>{decisions[p.id] === 'interested' ? 'INTERESTED' : 'PASSED — OPEN TO RECONSIDER'}</Text></View>}<View style={styles.cardBody}><Text style={styles.cardName}>{p.name}</Text><Text style={styles.location}>⌖  {p.location}</Text><Text style={styles.cardIntro}>{p.intro}</Text><View style={styles.pillRow}>{p.highlights.map(x => <Pill key={x}>{x}</Pill>)}</View><View style={styles.lookingBox}><Text style={styles.lookingLabel}>LOOKING FOR</Text><Text style={styles.lookingText}>{p.looking}</Text></View><Button label="View profile" tone="ghost" onPress={() => onOpen(p)} /></View></View>
        <View style={styles.browseControls}><Button small tone="light" label="← Previous" onPress={() => move(-1)} /><Text style={styles.centerHint}>{index + 1} of {visible.length}</Text><Button small tone="light" label="Next →" onPress={() => move(1)} /></View>
        <View style={styles.actionRow}><Button label={decisions[p.id] === 'passed' ? 'Reconsider pass' : 'Pass'} tone="light" onPress={() => changeDecision('passed')} /><Button label={decisions[p.id] === 'interested' ? 'Undo interested' : 'Interested'} onPress={() => changeDecision('interested')} /></View>
      </>}
    </ScrollView>
  </View>;
}

function PersonProfile({ profile, onBack, decision, setDecision }) {
  return <View style={styles.flex}><TopBar title="Profile" back onBack={onBack} />
    <ScrollView contentContainerStyle={styles.screenFlush} showsVerticalScrollIndicator={false}>
      <PhotoGallery photos={profile.photos} style={styles.profileHero} />
      <View style={styles.profileOverlayBadge}><Text style={styles.typeBadgeText}>{profile.type}</Text></View>
      <View style={styles.profileContent}>
        <Text style={styles.h1}>{profile.name}</Text><Text style={styles.location}>⌖  {profile.location}</Text>
        <Text style={styles.profileBio}>{profile.intro}</Text>
        <SectionTitle eyebrow="GOOD TO KNOW" title="The practical fit" />
        {Object.entries(profile.attributes).map(([group, values]) => <View key={group} style={styles.attributeGroup}><Text style={styles.attributeTitle}>{group}</Text><View style={styles.pillRowCompact}>{values.map(v => <Pill key={v}>{v}</Pill>)}</View></View>)}
        <View style={styles.divider} />
        {profile.facts.map(([title, body]) => <View key={title} style={styles.fact}><Text style={styles.factTitle}>{title}</Text><Text style={styles.body}>{body}</Text></View>)}
        <Text style={styles.eyebrow}>A LITTLE MORE PERSONAL</Text>
        {profile.prompts.map(([q, a]) => <View key={q} style={styles.promptCard}><Text style={styles.promptQ}>{q}</Text><Text style={styles.promptA}>“{a}”</Text></View>)}
        <View style={styles.actionRow}><Button tone="light" label={decision === 'passed' ? 'Reconsider pass' : 'Pass'} onPress={() => setDecision(profile.id, decision === 'passed' ? null : 'passed')} /><Button label={decision === 'interested' ? 'Undo interested' : 'Interested'} onPress={() => setDecision(profile.id, decision === 'interested' ? null : 'interested')} /></View>
        <Text style={styles.safetyNote}>Nothing is permanent. You can revisit and change your choice from Matches.</Text>
      </View>
    </ScrollView>
  </View>;
}

function ZukiDetail({ onBack, onGoFeed, onAccount }) {
  const [mode, setMode] = useState('pet');
  const [view, setView] = useState('detail');
  const [stage, setStage] = useState(2);
  const [requested, setRequested] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  if (view === 'care') return <Care onBack={() => setView('detail')} onAccount={onAccount} />;
  return <View style={styles.flex}><TopBar title="Zuki" back onBack={onBack} onAccount={onAccount} />
    <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.segment}><Pressable onPress={() => setMode('pet')} style={[styles.segmentItem, mode === 'pet' && styles.segmentActive]}><Text style={[styles.segmentText, mode === 'pet' && styles.segmentTextActive]}>Pet profile</Text></Pressable><Pressable onPress={() => setMode('relationship')} style={[styles.segmentItem, mode === 'relationship' && styles.segmentActive]}><Text style={[styles.segmentText, mode === 'relationship' && styles.segmentTextActive]}>Relationship</Text></Pressable></View>
      {mode === 'pet' ? <>
        <PhotoGallery photos={[zukiImage, zukiWalkImage]} style={styles.petHero} />
        <View style={styles.petNameRow}><View><Text style={styles.h1}>Zuki</Text><Text style={styles.location}>16 years old · Chihuahua mix · 9 lbs</Text></View><View style={styles.trustedBadge}><Text style={styles.trustedBadgeText}>♥ 3 people</Text></View></View>
        <Text style={styles.profileBio}>A gentle senior with discerning taste in blankets. Zuki is happiest near her people, enjoys a slow sniff around the block, and prefers calm introductions.</Text>
        <View style={styles.pillRow}><Pill>Quiet companion</Pill><Pill>Senior savvy</Pill><Pill>No stairs</Pill></View>
        <SectionTitle eyebrow="AT A GLANCE" title="What Zuki needs" />
        <View style={styles.grid}>
          {[['◷', 'Routine', 'Meals at 8 AM & 5:30 PM'], ['♡', 'Comfort', 'Approach from the front'], ['✚', 'Health', 'Two daily medications'], ['⌂', 'Limits', 'Short walks, no stairs']].map(([icon, title, txt]) => <View key={title} style={styles.miniCard}><Text style={styles.miniIcon}>{icon}</Text><Text style={styles.miniTitle}>{title}</Text><Text style={styles.miniText}>{txt}</Text></View>)}
        </View>
        <Button label="Open full care guide" onPress={() => setView('care')} />
        <View style={styles.infoNote}><Text style={styles.infoNoteTitle}>Emergency note</Text><Text style={styles.body}>If Zuki collapses, struggles to breathe, or cannot stand, call Mike and Rose City Emergency Vet immediately.</Text></View>
      </> : <>
        <SectionTitle eyebrow="OUR CIRCLE" title="Zuki’s trusted people" />
        <View style={styles.peopleStrip}>
          <View style={styles.personCircle}><Image source={mikeImage} style={styles.personCircleImage} /><Text style={styles.personName}>Mike</Text><Text style={styles.personRole}>Primary</Text></View>
          <View style={styles.relationshipLine} />
          <View style={styles.petCircle}><Image source={zukiImage} style={styles.personCircleImage} /><Text style={styles.personName}>Zuki</Text><Text style={styles.personRole}>The center</Text></View>
          <View style={styles.relationshipLine} />
          <View style={styles.personCircle}><Image source={peopleImage} style={styles.personCircleImage} /><Text style={styles.personName}>Haley & Ari</Text><Text style={styles.personRole}>Bonus humans</Text></View>
        </View>
        <View style={styles.statusCard}><Text style={styles.lookingLabel}>RELATIONSHIP STATUS</Text><Text style={styles.h3}>{['Meet & Greet', 'Trial Visits', 'Regular Bonus Human'][stage]}</Text>
          <View style={styles.timeline}>{['Meet & Greet', 'Trial Visits', 'Regular Bonus Human'].map((s, i) => <View key={s} style={styles.timelineStep}><View style={[styles.timelineDot, i <= stage && styles.timelineDotActive]}><Text style={styles.timelineCheck}>{i < stage ? '✓' : ''}</Text></View><Text style={[styles.timelineLabel, i <= stage && { color: C.ink }]}>{s}</Text>{i < 2 && <View style={[styles.timelineBar, i < stage && styles.timelineBarActive]} />}</View>)}</View>
          {stage < 2 && <Button label="Mark next step complete" small onPress={() => setStage(stage + 1)} />}
        </View>
        <SectionTitle eyebrow="UP NEXT" title="Make some Zuki time" />
        <View style={styles.availabilityCard}><View style={styles.dateBox}><Text style={styles.dateDay}>THU</Text><Text style={styles.dateNum}>20</Text></View><View style={styles.availText}><Text style={styles.h3}>7:00–11:00 PM</Text><Text style={styles.body}>Mike marked Zuki as available</Text></View></View>
        {!requested ? <Button label="I’d like this time with Zuki" onPress={() => setRequested(true)} /> : !confirmed ? <View style={styles.requestCard}><Text style={styles.requestTitle}>Request sent to Mike</Text><Text style={styles.body}>For the prototype, switch hats and confirm as the owner.</Text><Button label="Confirm as Mike" small onPress={() => setConfirmed(true)} /></View> : <View style={styles.confirmed}><Text style={styles.confirmedIcon}>✓</Text><View><Text style={styles.requestTitle}>Zuki time confirmed</Text><Text style={styles.body}>Thursday, 7:00–11:00 PM · Haley & Ari</Text></View></View>}
        <View style={styles.quickGrid}><Button label="View pet profile" tone="ghost" onPress={() => setMode('pet')} /><Button label="View care info" tone="ghost" onPress={() => setView('care')} /></View>
        <View style={styles.quickGrid}><Button label="Share update" tone="ghost" onPress={onGoFeed} /></View>
      </>}
    </ScrollView>
  </View>;
}

function PetsHub({ onGoFeed, onAccount }) {
  const [selected, setSelected] = useState(null);
  if (selected === 'zuki') return <ZukiDetail onBack={() => setSelected(null)} onGoFeed={onGoFeed} onAccount={onAccount} />;
  if (selected === 'mochi') return <View style={styles.flex}><TopBar title="Mochi" back onBack={() => setSelected(null)} onAccount={onAccount} /><ScrollView contentContainerStyle={styles.screen}><Image source={zukiWalkImage} style={styles.petHero} /><SectionTitle eyebrow="BONUS PET · EARLY CONNECTION" title="Mochi" /><Text style={styles.profileBio}>Mochi’s full pet and care profile will become available as this connection moves toward trial visits.</Text><Button small tone="light" label="Back to pets" onPress={() => setSelected(null)} /></ScrollView></View>;
  return <View style={styles.flex}><TopBar title="Pets & relationships" onAccount={onAccount} /><ScrollView contentContainerStyle={styles.screen}>
    <SectionTitle eyebrow="YOUR PET CIRCLE" title="People, pets, and care" />
    <Text style={styles.lede}>Each pet keeps their profile, trusted people, care details, and relationships together.</Text>
    <Text style={styles.listLabel}>PETS YOU OWN</Text>
    <Pressable onPress={() => setSelected('zuki')} style={styles.petListCard}><Image source={zukiImage} style={styles.petListImage} /><View style={styles.connectionCopy}><Text style={styles.h3}>Zuki</Text><Text style={styles.body}>1 active relationship · 3 trusted people</Text><Text style={styles.cardLink}>Open pet & relationship →</Text></View></Pressable>
    <Text style={styles.listLabel}>PETS YOU’RE A BONUS HUMAN FOR</Text>
    <Pressable onPress={() => setSelected('mochi')} style={styles.petListCard}><Image source={zukiWalkImage} style={styles.petListImage} /><View style={styles.connectionCopy}><Text style={styles.h3}>Mochi</Text><Text style={styles.body}>Early connection with Priya</Text><Text style={styles.cardLink}>View association →</Text></View></Pressable>
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
      <SectionTitle eyebrow="PRIVATE TO ZUKI’S CIRCLE" title="The little things, together" />
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

function Care({ onBack, onAccount }) {
  const [done, setDone] = useState({ breakfast: true, walk: false, dinner: false });
  return <View style={styles.flex}><TopBar title="Zuki · Care" back onBack={onBack} onAccount={onAccount} />
    <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.breadcrumb}><Text style={styles.breadcrumbText}>Relationship  ›  Zuki  ›  Care information</Text></View>
      <View style={styles.careHero}><Image source={zukiImage} style={styles.careAvatar} /><View style={styles.availText}><Text style={styles.eyebrow}>ZUKI · UPDATED 2 DAYS AGO</Text><Text style={styles.h2}>Everything you need, quickly.</Text></View></View>
      <View style={styles.todayCard}><View style={styles.todayHeader}><View><Text style={[styles.eyebrow, { color: C.gold }]}>TODAY · THURSDAY</Text><Text style={[styles.h3, { color: C.white }]}>Care checklist</Text></View><Text style={styles.progress}>{Object.values(done).filter(Boolean).length}/3</Text></View>
        {[['breakfast', '8:00 AM', 'Breakfast + heart medicine'], ['walk', '12:30 PM', 'Short sniff walk'], ['dinner', '5:30 PM', 'Dinner + joint chew']].map(([id, time, label]) => <Pressable key={id} onPress={() => setDone({ ...done, [id]: !done[id] })} style={styles.checkRow}><View style={[styles.checkbox, done[id] && styles.checkboxDone]}><Text style={styles.checkmark}>{done[id] ? '✓' : ''}</Text></View><Text style={styles.checkTime}>{time}</Text><Text style={[styles.checkLabel, done[id] && styles.strike]}>{label}</Text></Pressable>)}
      </View>
      {careSections.map(([title, body], i) => <View key={title} style={[styles.careSection, (i === 5 || i === 6) && styles.careEmergency]}><View style={[styles.careIcon, (i === 5 || i === 6) && { backgroundColor: C.clayLight }]}><Text style={styles.careIconText}>{['◷', '⌂', '✚', '↗', '♡', '!', '+'][i]}</Text></View><View style={styles.careCopy}><Text style={styles.factTitle}>{title}</Text><Text style={styles.careBody}>{body}</Text></View></View>)}
      <Text style={styles.safetyNote}>This guide is shared by Mike. When something feels wrong, contact him rather than guessing.</Text>
    </ScrollView>
  </View>;
}

function DecisionList({ status, decisions, setDecision, onOpen }) {
  const saved = profiles.filter(profile => decisions[profile.id] === status);
  if (!saved.length) return <View style={styles.emptyState}><Text style={styles.h3}>No {status} profiles yet</Text><Text style={styles.body}>{status === 'interested' ? 'Profiles you mark Interested will stay here for easy review.' : 'Profiles you pass on will stay here until you reconsider them.'}</Text></View>;
  return <View>{saved.map(profile => <View key={profile.id} style={styles.decisionListCard}><Pressable onPress={() => onOpen(profile)} style={styles.decisionProfileLink}><Image source={profile.image} style={styles.decisionImage} /><View style={styles.connectionCopy}><Text style={styles.h3}>{profile.name}</Text><Text style={styles.location}>{profile.location}</Text><Text style={styles.cardLink}>View profile →</Text></View></Pressable><Button small tone="light" label={status === 'interested' ? 'Undo interested' : 'Reconsider pass'} onPress={() => setDecision(profile.id, null)} /></View>)}</View>;
}

function Matches({ onAccount, decisions, setDecision, onOpen }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState('connections');
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([{ id: 1, who: 'Haley & Ari', text: 'We would love to meet you and Zuki somewhere quiet.' }, { id: 2, who: 'Mike', text: 'That sounds great. She does best with slow introductions.' }]);
  const send = () => { if (!draft.trim()) return; setMessages([...messages, { id: Date.now(), who: 'Mike', text: draft.trim() }]); setDraft(''); };
  if (open) return <View style={styles.flex}><TopBar title="Haley & Ari" back onBack={() => setOpen(false)} onAccount={onAccount} /><View style={styles.connectionSummary}><Image source={zukiImage} style={styles.connectionImage} /><View style={styles.connectionCopy}><Text style={styles.h3}>Matched with Mike + Zuki</Text><Text style={styles.body}>Planning a first meet & greet</Text></View></View><ScrollView contentContainerStyle={styles.chat} keyboardShouldPersistTaps="handled">{messages.map(m => <View key={m.id} style={[styles.bubble, m.who === 'Mike' ? styles.bubbleMine : styles.bubbleTheirs]}><Text style={styles.bubbleWho}>{m.who}</Text><Text style={styles.bubbleText}>{m.text}</Text></View>)}</ScrollView><View style={styles.chatComposer}><TextInput value={draft} onChangeText={setDraft} placeholder="Message Haley & Ari…" placeholderTextColor="#929B94" style={styles.input} /><Button small label="Send" onPress={send} /></View></View>;
  const interestedCount = Object.values(decisions).filter(value => value === 'interested').length;
  const passedCount = Object.values(decisions).filter(value => value === 'passed').length;
  return <View style={styles.flex}><TopBar title="Matches & Connections" onAccount={onAccount} /><ScrollView contentContainerStyle={styles.screen}>
    <View style={styles.connectionTabs}>{[['connections', 'Connections'], ['interested', `Interested ${interestedCount}`], ['passed', `Passed ${passedCount}`]].map(([id, label]) => <Pressable accessibilityRole="button" key={id} onPress={() => setView(id)} style={[styles.connectionTab, view === id && styles.connectionTabActive]}><Text style={[styles.connectionTabText, view === id && styles.connectionTabTextActive]}>{label}</Text></Pressable>)}</View>
    {view === 'connections' ? <><SectionTitle eyebrow="MUTUAL INTEREST" title="Get to know each other" /><Text style={styles.lede}>Connections are a low-pressure space to ask questions before anyone cares for a pet.</Text><Pressable onPress={() => setOpen(true)} style={styles.matchCard}><Image source={peopleImage} style={styles.matchImage} /><View style={styles.connectionCopy}><View style={styles.matchTitleRow}><Text style={styles.h3}>Haley & Ari</Text><View style={styles.unreadDot}><Text style={styles.unreadText}>1</Text></View></View><Text style={styles.body}>with Mike + Zuki</Text><Text style={styles.matchStatus}>● Planning a meet & greet</Text><Text style={styles.messagePreview}>“We would love to meet you and Zuki…”</Text></View><Text style={styles.chevron}>›</Text></Pressable></> : <><SectionTitle eyebrow={view === 'interested' ? 'PEOPLE TO REVIEW' : 'NOT RIGHT NOW'} title={view === 'interested' ? 'Interested profiles' : 'Passed profiles'} /><DecisionList status={view} decisions={decisions} setDecision={setDecision} onOpen={onOpen} /></>}
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
      <View style={styles.gallerySection}><Text style={styles.h1}>Screen title</Text><Text style={styles.h2}>Section header</Text><Text style={styles.h3}>Card title</Text><Text style={styles.body}>Body text explains a feature or relationship in a calm, readable voice.</Text><Text style={styles.location}>Helper text · General location</Text><Text style={styles.eyebrow}>LABEL / EYEBROW</Text></View>

      <SectionTitle eyebrow="ACTIONS" title="Buttons" />
      <View style={styles.gallerySection}><Button label="Primary action" /><Button label="Secondary action" tone="light" /><Button label="Outline action" tone="ghost" /><Button label="Destructive action" tone="danger" /><Button label="Disabled action" disabled /><View style={styles.iconButtonRow}><Pressable accessibilityRole="button" accessibilityLabel="Back icon example" style={styles.galleryIconButton}><Text style={styles.galleryIcon}>‹</Text></Pressable><Pressable accessibilityRole="button" accessibilityLabel="Send icon example" style={[styles.galleryIconButton, styles.galleryIconButtonPrimary]}><Text style={[styles.galleryIcon, { color: C.white }]}>↑</Text></Pressable><Pressable accessibilityRole="button" accessibilityLabel="Favorite icon example" style={styles.galleryIconButton}><Text style={[styles.galleryIcon, { color: C.clay }]}>♡</Text></Pressable></View></View>

      <SectionTitle eyebrow="CHOICES" title="Tags, chips & filters" />
      <View style={styles.gallerySection}><View style={styles.pillRowCompact}><Pill>Senior-dog experience</Pill><Pill warm>Milestone</Pill><StatusLabel tone="success">Confirmed</StatusLabel><StatusLabel tone="warning">Awaiting owner</StatusLabel><StatusLabel>Informational</StatusLabel></View><View style={styles.filterChips}><FilterChip label="Unselected" selected={false} onPress={() => {}} /><FilterChip label="Selected" selected={chipSelected} onPress={() => setChipSelected(!chipSelected)} /></View><DistanceSlider value={radius} onChange={setRadius} /><View style={styles.scheduleRow}><Text style={styles.scheduleDay}>Thursday</Text><View style={styles.scheduleTimes}><FilterChip label="AM" accessibilityLabel="Gallery Thursday AM" selected={false} onPress={() => {}} /><FilterChip label="PM" accessibilityLabel="Gallery Thursday PM" selected onPress={() => {}} /></View></View></View>

      <SectionTitle eyebrow="NAVIGATION" title="Active & inactive tabs" />
      <View style={[styles.connectionTabs, styles.gallerySection]}>{[['active', 'Active'], ['inactive', 'Inactive'], ['saved', 'Saved 2']].map(([id, label]) => <Pressable key={id} onPress={() => setGalleryTab(id)} style={[styles.connectionTab, galleryTab === id && styles.connectionTabActive]}><Text style={[styles.connectionTabText, galleryTab === id && styles.connectionTabTextActive]}>{label}</Text></Pressable>)}</View>

      <SectionTitle eyebrow="IMAGERY" title="Photo gallery treatment" />
      <View style={styles.gallerySection}><PhotoGallery photos={[peopleImage, peopleWalkImage]} style={styles.galleryPhoto} /></View>

      <SectionTitle eyebrow="CARDS" title="Profile card" />
      <View style={styles.discoveryCard}><PhotoGallery photos={[jordanImage, jordanWalkImage]} style={styles.galleryProfileImage} /><View style={styles.typeBadge}><Text style={styles.typeBadgeText}>BONUS HUMAN</Text></View><View style={styles.cardBody}><Text style={styles.cardName}>Jordan</Text><Text style={styles.location}>⌖  Sellwood · 6.8 mi</Text><Text style={styles.cardIntro}>A former lab parent looking for one lasting local connection.</Text><View style={styles.pillRow}><Pill>Weekend mornings</Pill><Pill>Fenced yard</Pill></View><Button label="View profile" tone="ghost" /></View></View>

      <SectionTitle eyebrow="CARDS" title="Pet & relationship cards" />
      <View style={styles.petListCard}><Image source={zukiImage} style={styles.petListImage} /><View style={styles.connectionCopy}><Text style={styles.h3}>Zuki</Text><Text style={styles.body}>16-year-old Chihuahua mix</Text><Text style={styles.cardLink}>Open pet & relationship →</Text></View></View>
      <View style={styles.statusCard}><Text style={styles.lookingLabel}>RELATIONSHIP STATUS</Text><Text style={styles.h3}>Regular Bonus Human</Text><View style={styles.timeline}>{['Meet & Greet', 'Trial Visits', 'Regular Bonus Human'].map((label, index) => <View key={label} style={styles.timelineStep}><View style={[styles.timelineDot, styles.timelineDotActive]}><Text style={styles.timelineCheck}>{index < 2 ? '✓' : ''}</Text></View><Text style={[styles.timelineLabel, { color: C.ink }]}>{label}</Text>{index < 2 && <View style={[styles.timelineBar, styles.timelineBarActive]} />}</View>)}</View></View>

      <SectionTitle eyebrow="CARDS" title="Feed & reactions" />
      <View style={styles.post}><View style={styles.postHeader}><View style={[styles.postAvatar, { backgroundColor: C.clay }]}><Text style={styles.postAvatarText}>H</Text></View><View style={styles.postMeta}><Text style={styles.postName}>Haley</Text><Text style={styles.postWhen}>Today · 8:42 PM</Text></View><Pill>Care update</Pill></View><Text style={styles.postText}>Zuki ate dinner and took her medicine. She is now deeply committed to the couch.</Text><Image source={zukiImage} style={styles.postImage} /><Pressable accessibilityRole="button" accessibilityLabel="Gallery reaction example" onPress={() => setReaction(!reaction)} style={[styles.postFooter, reaction && styles.postFooterLiked]}><Text style={[styles.postHeart, reaction && styles.postHeartLiked]}>{reaction ? '♥' : '♡'}</Text><Text style={[styles.postFooterText, reaction && { color: C.clay }]}>{reaction ? 'You love this' : '2 people love this'}</Text></Pressable></View>

      <SectionTitle eyebrow="FORMS" title="Inputs & states" />
      <View style={styles.gallerySection}><Text style={styles.fieldLabel}>First name</Text><TextInput accessibilityLabel="Gallery first name" value={sampleName} onChangeText={setSampleName} style={styles.field} /><Text style={styles.fieldLabel}>Short bio</Text><TextInput accessibilityLabel="Gallery short bio" placeholder="Tell people about yourself…" placeholderTextColor="#929B94" style={[styles.field, styles.fieldMultiline]} multiline /><View style={styles.preferenceRow}><View><Text style={styles.factTitle}>Notifications</Text><Text style={styles.body}>Selected / enabled state</Text></View><View style={[styles.switchTrack, styles.switchTrackOn]}><View style={[styles.switchKnob, styles.switchKnobOn]} /></View></View></View>

      <SectionTitle eyebrow="SCHEDULING" title="Availability & confirmation" />
      <View style={styles.availabilityCard}><View style={styles.dateBox}><Text style={styles.dateDay}>THU</Text><Text style={styles.dateNum}>20</Text></View><View style={styles.availText}><Text style={styles.h3}>7:00–11:00 PM</Text><Text style={styles.body}>Mike marked Zuki as available</Text></View></View><View style={styles.confirmed}><Text style={styles.confirmedIcon}>✓</Text><View><Text style={styles.requestTitle}>Zuki time confirmed</Text><Text style={styles.body}>Haley & Ari · Thursday evening</Text></View></View>

      <SectionTitle eyebrow="FEEDBACK" title="Empty state" />
      <View style={styles.emptyState}><Text style={styles.h3}>No profiles match these filters</Text><Text style={styles.body}>Try increasing the distance or clearing your filters.</Text><View style={styles.emptyActions}><Button small label="Increase distance" /><Button small tone="light" label="Clear filters" /></View></View>
    </ScrollView>
  </View>;
}

function Account({ mode, onModeChange, onBack, onOpenRelationship, onOpenGallery }) {
  const [name, setName] = useState('Mike');
  const [bio, setBio] = useState('Zuki’s primary human for 16 wonderful years.');
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);
  const [photoAdded, setPhotoAdded] = useState(false);
  return <View style={styles.flex}><TopBar title="Your account" back={!!onBack} onBack={onBack} /><ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
    <View style={styles.myHeader}><Image source={mikeImage} style={styles.myImage} /><View style={styles.myCopy}><Text style={styles.h2}>Mike</Text><Text style={styles.location}>Primary human to Zuki</Text><Pill>Profile 85% complete</Pill></View></View>
    <SectionTitle eyebrow="MODE" title="How are you using Bonus Human?" /><View style={styles.modeToggle}><Pressable onPress={() => onModeChange('owner')} style={[styles.modeChoice, mode === 'owner' && styles.modeChoiceActive]}><Text style={[styles.modeChoiceTitle, mode === 'owner' && styles.modeChoiceTitleActive]}>Pet Owner mode</Text><Text style={styles.modeChoiceText}>Find bonus humans</Text></Pressable><Pressable onPress={() => onModeChange('bonus')} style={[styles.modeChoice, mode === 'bonus' && styles.modeChoiceActive]}><Text style={[styles.modeChoiceTitle, mode === 'bonus' && styles.modeChoiceTitleActive]}>Bonus Human mode</Text><Text style={styles.modeChoiceText}>Find pets and owners</Text></Pressable></View>
    <SectionTitle eyebrow="PROFILE" title="Edit your information" /><Text style={styles.fieldLabel}>First name</Text><TextInput accessibilityLabel="First name" value={name} onChangeText={setName} style={styles.field} /><Text style={styles.fieldLabel}>Short bio</Text><TextInput accessibilityLabel="Short bio" value={bio} onChangeText={setBio} style={[styles.field, styles.fieldMultiline]} multiline /><Button small label={saved ? 'Saved ✓' : 'Save profile'} onPress={() => setSaved(true)} />
    <SectionTitle eyebrow="PHOTOS" title="Manage profile photos" /><View style={styles.photoManager}><Image source={mikeImage} style={styles.photoThumb} /><Image source={zukiImage} style={styles.photoThumb} />{photoAdded && <Image source={peopleWalkImage} style={styles.photoThumb} />}<Pressable onPress={() => setPhotoAdded(true)} style={styles.addPhoto}><Text style={styles.addPhotoPlus}>＋</Text><Text style={styles.addPhotoText}>Add mocked photo</Text></Pressable></View>
    <SectionTitle eyebrow="ACCOUNT SETTINGS" title="Preferences" /><Pressable onPress={() => setNotifications(!notifications)} style={styles.preferenceRow}><View><Text style={styles.factTitle}>Notifications</Text><Text style={styles.body}>Matches, messages, and care updates</Text></View><View style={[styles.switchTrack, notifications && styles.switchTrackOn]}><View style={[styles.switchKnob, notifications && styles.switchKnobOn]} /></View></Pressable>
    <Pressable onPress={onOpenRelationship} style={styles.connectionCard}><Image source={zukiImage} style={styles.connectionImage} /><View style={styles.connectionCopy}><Text style={styles.h3}>Zuki + Haley & Ari</Text><Text style={styles.body}>Regular Bonus Human · 5 months</Text><Text style={styles.cardLink}>Open relationship →</Text></View></Pressable>
    {__DEV__ && <><SectionTitle eyebrow="DEVELOPMENT" title="Visual review" /><Pressable accessibilityRole="button" onPress={onOpenGallery} style={styles.settingsRow}><Text style={styles.settingsText}>UI Gallery (Dev)</Text><Text style={styles.chevron}>›</Text></Pressable></>}
    <View style={styles.valuesCard}><Text style={styles.lookingLabel}>THE BONUS HUMAN PROMISE</Text><Text style={styles.body}>The pet’s wellbeing comes first. Owners stay responsible. Bonus humans give time because the relationship itself is valuable.</Text></View>
  </ScrollView></View>;
}

const tabs = [['discover', '⌕', 'Discover'], ['pets', '♥', 'Pets'], ['matches', '◇', 'Matches'], ['feed', '▤', 'Feed'], ['profile', '○', 'Profile']];

export default function App() {
  const [tab, setTab] = useState('discover');
  const [detail, setDetail] = useState(null);
  const [mode, setMode] = useState('owner');
  const [decisions, setDecisions] = useState({});
  const setDecision = (id, status) => setDecisions(current => { const next = { ...current }; if (status) next[id] = status; else delete next[id]; return next; });
  const selectTab = id => { setDetail(null); setTab(id); };
  const openAccount = () => setDetail({ kind: 'account' });
  const openGallery = () => setDetail({ kind: 'gallery' });
  const openRelationship = () => { setDetail(null); setTab('pets'); };
  const content = detail?.kind === 'person' ? <PersonProfile profile={detail.profile} onBack={() => setDetail(null)} decision={decisions[detail.profile.id]} setDecision={setDecision} />
    : detail?.kind === 'account' ? <Account mode={mode} onModeChange={setMode} onBack={() => setDetail(null)} onOpenRelationship={openRelationship} onOpenGallery={openGallery} />
    : detail?.kind === 'gallery' ? <UIGallery onBack={() => setDetail({ kind: 'account' })} />
    : tab === 'discover' ? <Discovery mode={mode} onModeChange={setMode} decisions={decisions} setDecision={setDecision} onOpen={profile => setDetail({ kind: 'person', profile })} onAccount={openAccount} />
    : tab === 'pets' ? <PetsHub onGoFeed={() => selectTab('feed')} onAccount={openAccount} />
    : tab === 'matches' ? <Matches onAccount={openAccount} decisions={decisions} setDecision={setDecision} onOpen={profile => setDetail({ kind: 'person', profile })} />
    : tab === 'feed' ? <Feed onAccount={openAccount} />
    : <Account mode={mode} onModeChange={setMode} onOpenRelationship={openRelationship} onOpenGallery={openGallery} />;
  return <SafeAreaView style={styles.safe}><StatusBar barStyle="dark-content" backgroundColor={C.paper} /><View style={styles.appShell}>{content}{!detail && <View style={styles.tabBar}>{tabs.map(([id, icon, label]) => <Pressable accessibilityRole="button" key={id} onPress={() => selectTab(id)} style={styles.tab}><Text style={[styles.tabIcon, tab === id && styles.tabActive]}>{icon}</Text><Text style={[styles.tabLabel, tab === id && styles.tabActive]}>{label}</Text>{tab === id && <View style={styles.tabDot} />}</Pressable>)}</View>}</View></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.paper }, flex: { flex: 1 }, appShell: { flex: 1, width: '100%', maxWidth: 520, alignSelf: 'center', backgroundColor: C.paper },
  screen: { paddingHorizontal: 20, paddingBottom: 34 }, screenFlush: { paddingBottom: 34 },
  topBar: { height: 58, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: C.line, backgroundColor: C.paper },
  brandMark: { width: 29, height: 29, borderRadius: 10, backgroundColor: C.sage, alignItems: 'center', justifyContent: 'center' }, brandMarkText: { color: C.white, fontSize: 16, fontWeight: '800' },
  topTitle: { flex: 1, textAlign: 'center', color: C.ink, fontSize: 17, fontWeight: '800', letterSpacing: -.2 }, topAction: { width: 29, alignItems: 'flex-end' },
  avatarMini: { width: 30, height: 30, borderRadius: 15, backgroundColor: C.clayLight, justifyContent: 'center', alignItems: 'center' }, avatarMiniText: { color: C.clay, fontWeight: '800' }, back: { width: 29, color: C.ink, fontSize: 38, lineHeight: 38 },
  discoverIntro: { marginTop: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, sectionTitle: { marginTop: 26, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  eyebrow: { color: C.clay, fontSize: 11, letterSpacing: 1.4, fontWeight: '800', marginBottom: 5 }, h1: { color: C.ink, fontSize: 30, lineHeight: 35, fontWeight: '800', letterSpacing: -.8 }, h2: { color: C.ink, fontSize: 23, lineHeight: 28, fontWeight: '800', letterSpacing: -.5 }, h3: { color: C.ink, fontSize: 17, lineHeight: 22, fontWeight: '800' },
  lede: { color: C.muted, fontSize: 15, lineHeight: 22, marginTop: 6, marginBottom: 18 }, body: { color: C.muted, fontSize: 14, lineHeight: 21 },
  pill: { backgroundColor: C.sageLight, borderRadius: 99, paddingVertical: 7, paddingHorizontal: 11, alignSelf: 'flex-start' }, pillWarm: { backgroundColor: C.clayLight }, pillText: { color: C.sage, fontWeight: '700', fontSize: 11 }, pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginVertical: 14 }, statusLabel: { borderRadius: 99, paddingVertical: 7, paddingHorizontal: 11, alignSelf: 'flex-start', backgroundColor: '#EEECE6' }, statusLabel_success: { backgroundColor: C.sageLight }, statusLabel_warning: { backgroundColor: '#FFF2D8' }, statusLabelText: { color: C.muted, fontSize: 11, fontWeight: '800' }, statusLabelText_success: { color: C.sage }, statusLabelText_warning: { color: '#946B20' },
  discoveryCard: { backgroundColor: C.white, borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: C.line, ...Platform.select({ web: { boxShadow: '0 8px 28px rgba(39,51,45,.09)' }, default: { elevation: 3 } }) },
  discoveryImage: { width: '100%', height: 300, resizeMode: 'cover' }, typeBadge: { position: 'absolute', top: 16, left: 16, backgroundColor: 'rgba(39,51,45,.86)', paddingVertical: 7, paddingHorizontal: 10, borderRadius: 8 }, typeBadgeText: { color: C.white, fontSize: 10, fontWeight: '800', letterSpacing: 1.2 }, cardBody: { padding: 18 }, cardName: { fontSize: 25, color: C.ink, fontWeight: '800' },
  location: { color: C.muted, fontSize: 13, lineHeight: 20 }, cardIntro: { color: C.ink, fontSize: 15, lineHeight: 22, marginTop: 12 }, lookingBox: { backgroundColor: C.paper, padding: 14, borderRadius: 14, marginBottom: 14 }, lookingLabel: { color: C.clay, fontSize: 10, fontWeight: '800', letterSpacing: 1.15, marginBottom: 5 }, lookingText: { color: C.ink, fontSize: 14, lineHeight: 20, fontWeight: '600' },
  button: { minHeight: 48, borderRadius: 14, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', flexGrow: 1 }, buttonSmall: { flexGrow: 0, minHeight: 42, marginTop: 12 }, button_primary: { backgroundColor: C.sage }, button_ghost: { backgroundColor: C.white, borderWidth: 1.5, borderColor: C.sage }, button_light: { backgroundColor: C.sageLight }, button_danger: { backgroundColor: C.clay }, buttonText: { fontSize: 14, fontWeight: '800' }, buttonText_primary: { color: C.white }, buttonText_ghost: { color: C.sage }, buttonText_light: { color: C.sage }, buttonText_danger: { color: C.white }, actionRow: { flexDirection: 'row', gap: 12, marginTop: 16 }, centerHint: { textAlign: 'center', color: C.muted, fontSize: 11, marginTop: 12 },
  profileHero: { width: '100%', height: 330, resizeMode: 'cover' }, profileOverlayBadge: { position: 'absolute', top: 18, left: 18, backgroundColor: 'rgba(39,51,45,.86)', padding: 9, borderRadius: 8 }, profileContent: { padding: 20 }, profileBio: { color: C.ink, fontSize: 16, lineHeight: 24, marginTop: 14 }, divider: { height: 1, backgroundColor: C.line, marginVertical: 14 }, fact: { marginBottom: 22 }, factTitle: { color: C.ink, fontSize: 15, fontWeight: '800', marginBottom: 5 }, promptCard: { backgroundColor: C.clayLight, borderRadius: 16, padding: 16, marginBottom: 12 }, promptQ: { color: C.clay, fontSize: 11, fontWeight: '800', letterSpacing: .6, marginBottom: 7 }, promptA: { color: C.ink, fontSize: 16, lineHeight: 23, fontWeight: '600' }, safetyNote: { color: C.muted, fontSize: 12, textAlign: 'center', lineHeight: 18, margin: 14 },
  segment: { flexDirection: 'row', backgroundColor: '#EEECE6', borderRadius: 12, padding: 4, marginTop: 16 }, segmentItem: { flex: 1, padding: 10, alignItems: 'center', borderRadius: 9 }, segmentActive: { backgroundColor: C.white }, segmentText: { color: C.muted, fontSize: 13, fontWeight: '700' }, segmentTextActive: { color: C.ink },
  petHero: { height: 300, width: '100%', borderRadius: 22, marginTop: 18, resizeMode: 'cover' }, petNameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 }, trustedBadge: { backgroundColor: C.clayLight, borderRadius: 99, padding: 10 }, trustedBadgeText: { color: C.clay, fontSize: 11, fontWeight: '800' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 }, miniCard: { width: '48.5%', backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 15, padding: 14 }, miniIcon: { color: C.clay, fontSize: 20, marginBottom: 10 }, miniTitle: { color: C.ink, fontSize: 14, fontWeight: '800' }, miniText: { color: C.muted, fontSize: 12, lineHeight: 17, marginTop: 3 }, infoNote: { borderLeftWidth: 3, borderLeftColor: C.clay, backgroundColor: C.clayLight, padding: 14, marginTop: 16, borderRadius: 8 }, infoNoteTitle: { color: C.clay, fontWeight: '800', marginBottom: 4 },
  peopleStrip: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 14 }, personCircle: { width: 90, alignItems: 'center' }, petCircle: { width: 82, alignItems: 'center' }, personCircleImage: { width: 64, height: 64, borderRadius: 32, resizeMode: 'cover', borderWidth: 3, borderColor: C.white }, personName: { color: C.ink, fontSize: 11, fontWeight: '800', marginTop: 6, textAlign: 'center' }, personRole: { color: C.muted, fontSize: 9, textAlign: 'center' }, relationshipLine: { width: 23, height: 1.5, backgroundColor: C.gold, marginBottom: 28 },
  statusCard: { backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 18, padding: 17, marginTop: 14 }, timeline: { flexDirection: 'row', marginTop: 20, marginBottom: 6 }, timelineStep: { flex: 1, alignItems: 'center', position: 'relative' }, timelineDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#D9DDD9', alignItems: 'center', justifyContent: 'center', zIndex: 2 }, timelineDotActive: { backgroundColor: C.sage }, timelineCheck: { color: C.white, fontSize: 12, fontWeight: '800' }, timelineLabel: { color: '#939A95', fontSize: 9, textAlign: 'center', marginTop: 6 }, timelineBar: { position: 'absolute', left: '63%', top: 11, height: 2, width: '74%', backgroundColor: '#D9DDD9' }, timelineBarActive: { backgroundColor: C.sage },
  availabilityCard: { flexDirection: 'row', backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 14, marginBottom: 12, alignItems: 'center' }, dateBox: { backgroundColor: C.clayLight, width: 56, height: 62, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }, dateDay: { color: C.clay, fontSize: 10, fontWeight: '800' }, dateNum: { color: C.ink, fontSize: 23, fontWeight: '800' }, availText: { flex: 1, marginLeft: 13 }, requestCard: { backgroundColor: C.sageLight, borderRadius: 16, padding: 16 }, requestTitle: { color: C.ink, fontSize: 15, fontWeight: '800', marginBottom: 3 }, confirmed: { backgroundColor: C.sageLight, borderRadius: 16, padding: 15, flexDirection: 'row', alignItems: 'center' }, confirmedIcon: { width: 30, height: 30, borderRadius: 15, backgroundColor: C.sage, color: C.white, textAlign: 'center', lineHeight: 30, fontWeight: '800', marginRight: 11 }, quickGrid: { flexDirection: 'row', gap: 10, marginTop: 12 },
  composer: { flexDirection: 'row', backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 17, padding: 12, alignItems: 'center', marginBottom: 18 }, input: { flex: 1, minHeight: 35, maxHeight: 90, color: C.ink, fontSize: 14, paddingHorizontal: 10, paddingVertical: 7 }, send: { width: 32, height: 32, borderRadius: 16, backgroundColor: C.sage, alignItems: 'center', justifyContent: 'center' }, sendText: { color: C.white, fontSize: 20, fontWeight: '800', marginTop: -2 },
  post: { backgroundColor: C.white, borderRadius: 18, borderWidth: 1, borderColor: C.line, padding: 16, marginBottom: 14 }, postHeader: { flexDirection: 'row', alignItems: 'center' }, postAvatar: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' }, postAvatarText: { color: C.white, fontWeight: '800' }, postMeta: { flex: 1, marginLeft: 9 }, postName: { color: C.ink, fontWeight: '800', fontSize: 13 }, postWhen: { color: C.muted, fontSize: 10, marginTop: 2 }, postText: { color: C.ink, fontSize: 15, lineHeight: 22, marginVertical: 13 }, postImage: { height: 245, width: '100%', borderRadius: 13, resizeMode: 'cover' }, postFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 12, borderRadius: 12, alignSelf: 'flex-start', paddingVertical: 5, paddingHorizontal: 7 }, postFooterLiked: { backgroundColor: C.clayLight }, postHeart: { color: C.clay, fontSize: 21 }, postHeartLiked: { color: C.clay }, postFooterText: { color: C.muted, fontSize: 10, marginLeft: 7 },
  careHero: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 18 }, careAvatar: { width: 74, height: 74, borderRadius: 18, resizeMode: 'cover' }, todayCard: { backgroundColor: C.navy, borderRadius: 18, padding: 16 }, todayHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }, progress: { color: C.white, backgroundColor: 'rgba(255,255,255,.15)', padding: 9, borderRadius: 10, fontWeight: '800' }, checkRow: { flexDirection: 'row', alignItems: 'center', minHeight: 44, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,.13)' }, checkbox: { width: 22, height: 22, borderRadius: 7, borderWidth: 1.5, borderColor: 'rgba(255,255,255,.6)', alignItems: 'center', justifyContent: 'center' }, checkboxDone: { backgroundColor: C.gold, borderColor: C.gold }, checkmark: { color: C.navy, fontWeight: '900' }, checkTime: { color: '#D8E1E5', fontSize: 11, width: 68, marginLeft: 10 }, checkLabel: { color: C.white, fontSize: 13, flex: 1 }, strike: { textDecorationLine: 'line-through', opacity: .55 }, careSection: { flexDirection: 'row', backgroundColor: C.white, borderBottomWidth: 1, borderBottomColor: C.line, paddingVertical: 17 }, careEmergency: { backgroundColor: '#FFF9F6', paddingHorizontal: 10 }, careIcon: { width: 35, height: 35, borderRadius: 11, backgroundColor: C.sageLight, alignItems: 'center', justifyContent: 'center' }, careIconText: { color: C.sage, fontWeight: '800', fontSize: 16 }, careCopy: { flex: 1, marginLeft: 12 }, careBody: { color: C.muted, fontSize: 13, lineHeight: 20 },
  myHeader: { flexDirection: 'row', alignItems: 'center', marginTop: 22 }, myImage: { width: 92, height: 92, borderRadius: 24, resizeMode: 'cover' }, myCopy: { flex: 1, marginLeft: 16, gap: 4 }, quoteCard: { backgroundColor: C.sageLight, borderRadius: 18, padding: 18, marginTop: 18 }, quote: { color: C.sage, fontSize: 17, lineHeight: 25, fontWeight: '700' }, connectionCard: { flexDirection: 'row', backgroundColor: C.white, padding: 12, borderRadius: 16, borderWidth: 1, borderColor: C.line, alignItems: 'center' }, connectionImage: { width: 58, height: 58, borderRadius: 14, resizeMode: 'cover' }, connectionCopy: { flex: 1, marginLeft: 12 }, tinyStatus: { flexDirection: 'row', alignItems: 'center', marginTop: 5 }, onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: C.sage, marginRight: 5 }, tinyStatusText: { color: C.sage, fontSize: 10, fontWeight: '700' }, chevron: { color: C.muted, fontSize: 26 }, settingsRow: { flexDirection: 'row', minHeight: 52, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: C.line }, settingsText: { flex: 1, color: C.ink, fontSize: 14, fontWeight: '600' }, valuesCard: { backgroundColor: C.clayLight, borderRadius: 16, padding: 16, marginTop: 22 },
  compactMode: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: C.sageLight, borderRadius: 99, paddingVertical: 7, paddingHorizontal: 10, marginTop: 10, marginBottom: 14 }, modeStatusDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: C.sage, marginRight: 7 }, compactModeText: { color: C.sage, fontWeight: '700', fontSize: 10 }, modeSwitchText: { color: C.clay, fontWeight: '800', fontSize: 10, marginLeft: 8 }, filterButton: { borderWidth: 1, borderColor: C.line, backgroundColor: C.white, paddingVertical: 9, paddingHorizontal: 12, borderRadius: 12 }, filterButtonText: { color: C.sage, fontWeight: '800', fontSize: 12 },
  browseControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }, emptyState: { backgroundColor: C.white, borderRadius: 18, padding: 22, alignItems: 'center', gap: 8, borderWidth: 1, borderColor: C.line, marginTop: 4 }, emptyActions: { flexDirection: 'row', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }, decisionBadge: { position: 'absolute', top: 16, right: 16, backgroundColor: C.clay, borderRadius: 8, padding: 7 }, decisionBadgeText: { color: C.white, fontSize: 8, fontWeight: '900', letterSpacing: .7 },
  gallery: { position: 'relative' }, galleryPosition: { height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, backgroundColor: C.white }, galleryDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#C9CEC9' }, galleryDotActive: { width: 14, backgroundColor: C.sage },
  distanceBlock: { backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 15, marginBottom: 12 }, distanceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, distanceValue: { color: C.sage, fontSize: 16, fontWeight: '800' }, sliderTrack: { height: 28, borderRadius: 14, backgroundColor: C.sageLight, marginTop: 12, justifyContent: 'center' }, sliderFill: { position: 'absolute', left: 0, height: 6, borderRadius: 3, backgroundColor: C.sage }, sliderThumb: { position: 'absolute', marginLeft: -11, width: 22, height: 22, borderRadius: 11, backgroundColor: C.white, borderWidth: 3, borderColor: C.sage, elevation: 2 }, sliderLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }, sliderLabel: { color: C.muted, fontSize: 9 }, filterGroup: { backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 15, marginBottom: 12 }, filterHelp: { color: C.muted, fontSize: 11, marginBottom: 8 }, filterChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }, filterChip: { paddingVertical: 9, paddingHorizontal: 12, borderRadius: 99, borderWidth: 1, borderColor: C.line, backgroundColor: C.paper }, filterChipActive: { backgroundColor: C.sage, borderColor: C.sage }, filterChipText: { color: C.muted, fontSize: 12, fontWeight: '700' }, filterChipTextActive: { color: C.white }, scheduleRow: { minHeight: 46, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: C.line }, scheduleDay: { flex: 1, color: C.ink, fontSize: 13, fontWeight: '700' }, scheduleTimes: { flexDirection: 'row', gap: 7 }, pillRowCompact: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 7 }, attributeGroup: { backgroundColor: C.white, borderWidth: 1, borderColor: C.line, padding: 14, marginBottom: 9, borderRadius: 14 }, attributeTitle: { color: C.ink, fontWeight: '800', fontSize: 13 },
  listLabel: { color: C.muted, fontSize: 10, fontWeight: '800', letterSpacing: 1.2, marginTop: 18, marginBottom: 8 }, petListCard: { flexDirection: 'row', backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 17, padding: 12, marginBottom: 12, alignItems: 'center' }, petListImage: { width: 74, height: 74, borderRadius: 16, resizeMode: 'cover' }, cardLink: { color: C.sage, fontSize: 11, fontWeight: '800', marginTop: 6 },
  connectionTabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.line, marginTop: 10 }, connectionTab: { flex: 1, paddingVertical: 12, alignItems: 'center' }, connectionTabActive: { borderBottomWidth: 2, borderBottomColor: C.clay }, connectionTabText: { color: C.muted, fontSize: 10, fontWeight: '700' }, connectionTabTextActive: { color: C.ink }, matchCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 18, padding: 13 }, matchImage: { width: 76, height: 90, borderRadius: 15, resizeMode: 'cover' }, matchTitleRow: { flexDirection: 'row', justifyContent: 'space-between' }, matchStatus: { color: C.sage, fontSize: 11, fontWeight: '800', marginTop: 6 }, messagePreview: { color: C.muted, fontSize: 12, marginTop: 7, fontStyle: 'italic' }, unreadDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: C.clay, alignItems: 'center', justifyContent: 'center' }, unreadText: { color: C.white, fontWeight: '800', fontSize: 10 }, decisionListCard: { backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 17, padding: 12, marginBottom: 12 }, decisionProfileLink: { flexDirection: 'row', alignItems: 'center' }, decisionImage: { width: 68, height: 72, borderRadius: 14, resizeMode: 'cover' }, connectionSummary: { flexDirection: 'row', backgroundColor: C.sageLight, padding: 12, alignItems: 'center' }, chat: { padding: 18, gap: 12 }, bubble: { maxWidth: '82%', padding: 13, borderRadius: 16 }, bubbleMine: { alignSelf: 'flex-end', backgroundColor: C.sage }, bubbleTheirs: { alignSelf: 'flex-start', backgroundColor: C.white, borderWidth: 1, borderColor: C.line }, bubbleWho: { fontSize: 9, fontWeight: '800', color: C.clay, marginBottom: 4 }, bubbleText: { color: C.ink, fontSize: 14, lineHeight: 20 }, chatComposer: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderTopColor: C.line, backgroundColor: C.white, alignItems: 'center', gap: 8 },
  breadcrumb: { backgroundColor: C.sageLight, borderRadius: 10, padding: 9, marginTop: 14 }, breadcrumbText: { color: C.sage, fontSize: 10, fontWeight: '700' }, modeToggle: { flexDirection: 'row', gap: 10 }, modeChoice: { flex: 1, borderWidth: 1, borderColor: C.line, borderRadius: 15, padding: 14, backgroundColor: C.white }, modeChoiceActive: { borderColor: C.sage, backgroundColor: C.sageLight }, modeChoiceTitle: { color: C.ink, fontWeight: '800', fontSize: 13 }, modeChoiceTitleActive: { color: C.sage }, modeChoiceText: { color: C.muted, fontSize: 10, marginTop: 4 }, fieldLabel: { color: C.muted, fontSize: 11, fontWeight: '800', marginTop: 10, marginBottom: 5 }, field: { backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 12, minHeight: 44, paddingHorizontal: 12, color: C.ink }, fieldMultiline: { minHeight: 82, paddingTop: 11, textAlignVertical: 'top' }, photoManager: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 }, photoThumb: { width: 72, height: 72, borderRadius: 13, resizeMode: 'cover' }, addPhoto: { width: 92, height: 72, borderRadius: 13, borderWidth: 1, borderStyle: 'dashed', borderColor: C.sage, alignItems: 'center', justifyContent: 'center' }, addPhotoPlus: { color: C.sage, fontSize: 20 }, addPhotoText: { color: C.sage, fontSize: 8, fontWeight: '800' }, preferenceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: C.white, borderWidth: 1, borderColor: C.line, padding: 14, borderRadius: 14, marginBottom: 15 }, switchTrack: { width: 44, height: 25, borderRadius: 13, backgroundColor: '#CCD2CE', padding: 3 }, switchTrackOn: { backgroundColor: C.sage }, switchKnob: { width: 19, height: 19, borderRadius: 10, backgroundColor: C.white }, switchKnobOn: { marginLeft: 19 }, galleryIntro: { color: C.muted, fontSize: 14, lineHeight: 21, marginTop: 20 }, gallerySection: { backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 15, gap: 12 }, iconButtonRow: { flexDirection: 'row', gap: 10 }, galleryIconButton: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: C.line, backgroundColor: C.white, alignItems: 'center', justifyContent: 'center' }, galleryIconButtonPrimary: { backgroundColor: C.sage, borderColor: C.sage }, galleryIcon: { color: C.ink, fontSize: 24, fontWeight: '800' }, galleryPhoto: { width: '100%', height: 230, borderRadius: 14, resizeMode: 'cover' }, galleryProfileImage: { width: '100%', height: 250, resizeMode: 'cover' },
  tabBar: { height: 68, flexDirection: 'row', borderTopWidth: 1, borderTopColor: C.line, backgroundColor: C.white, paddingBottom: Platform.OS === 'ios' ? 5 : 0 }, tab: { flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' }, tabIcon: { color: '#7E8982', fontSize: 21, lineHeight: 23 }, tabLabel: { color: '#7E8982', fontSize: 9, marginTop: 3, fontWeight: '700' }, tabActive: { color: C.sage }, tabDot: { position: 'absolute', bottom: 4, width: 4, height: 4, borderRadius: 2, backgroundColor: C.clay },
});
