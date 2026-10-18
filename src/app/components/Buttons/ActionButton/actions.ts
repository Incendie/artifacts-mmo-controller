interface ActionProps {
  CHARACTER_NAME: string;
  headers: { [key: string]: string };
}

interface MoveProps extends ActionProps {
  x: number;
  y: number;
}

interface ActionReturn {
  errorMessage: string;
  cooldownSeconds?: number;
  messages: string[];
}

const move = async ({
  CHARACTER_NAME,
  headers,
  x,
  y,
}: MoveProps): Promise<ActionReturn> => {
  const body = JSON.stringify({ x, y });
  const url = `https://api.artifactsmmo.com/my/${CHARACTER_NAME}/action/move`;
  const messages: string[] = [];
  let errorMessage = '';
  let cooldownSeconds = 0;

  try {
    const response = await fetch(url, { method: 'POST', headers, body });
    const data = await response.json();

    if (data.error) throw new Error(data.error.message);

    const { destination, cooldown } = data.data;
    console.log(
      `✅ Moved to (${destination.x}, ${destination.y}) on ${destination.name}`,
    );
    console.log(`⏳ Cooldown started: ${cooldown.total_seconds} seconds`);
    messages.push(
      `✅ Moved to (${destination.x}, ${destination.y}) on ${destination.name}`,
    );
    messages.push(`⏳ Cooldown started: ${cooldown.total_seconds} seconds`);
    cooldownSeconds = cooldown.total_seconds;
  } catch (error) {
    console.error('❌ ' + error);
    errorMessage = '❌ ' + error;
  }

  return { errorMessage, cooldownSeconds, messages };
};

const fight = async ({
  CHARACTER_NAME,
  headers,
}: ActionProps): Promise<ActionReturn> => {
  const messages: string[] = [];
  let errorMessage = '';
  let cooldownSeconds = 0;
  const url = `https://api.artifactsmmo.com/my/${CHARACTER_NAME}/action/fight`;

  try {
    const response = await fetch(url, { method: 'POST', headers });
    const data = await response.json();

    if (data.error) throw new Error(data.error.message);

    const { fight, cooldown } = data.data;
    const fightStats = fight.characters[0];
    console.log({ fight });
    console.log(fight.result === 'win' ? '🏆 Fight won!' : '💀 Fight lost!');
    console.log(
      `⚔️  XP gained: ${fightStats.xp} | HP remaining: ${fightStats.final_hp}`,
    );
    console.log(`⏳ Cooldown started: ${cooldown.total_seconds} seconds`);

    messages.push(fight.result === 'win' ? '🏆 Fight won!' : '💀 Fight lost!');
    messages.push(
      `⚔️  XP gained: ${fightStats.xp} | HP remaining: ${fightStats.final_hp}`,
    );
    messages.push(`⏳ Cooldown started: ${cooldown.total_seconds} seconds`);
    cooldownSeconds = cooldown.total_seconds;

    if (fightStats.drops && fightStats.drops.length > 0) {
      const dropsStr = fightStats.drops
        .map(d => `${d.quantity}x ${d.code}`)
        .join(', ');
      console.log(`🎁 Loot dropped: ${dropsStr}`);
      messages.push(`🎁 Loot dropped: ${dropsStr}`);
    }
  } catch (error) {
    console.error('❌ ' + error);
    errorMessage = '❌ ' + error;
  }

  return { cooldownSeconds, errorMessage, messages };
};
const rest = async ({
  CHARACTER_NAME,
  headers,
}: ActionProps): Promise<ActionReturn> => {
  const url = `https://api.artifactsmmo.com/my/${CHARACTER_NAME}/action/rest`;
  const messages: string[] = [];
  let errorMessage = '';
  let cooldownSeconds = 0;

  try {
    const response = await fetch(url, { method: 'POST', headers });
    const data = await response.json();

    if (data.error) throw new Error(data.error.message);

    const { cooldown, hp_restored } = data.data;
    const hp = data.data.character.hp;
    const max_hp = data.data.character.max_hp;

    console.log(`🛏️  Rested and restored ${hp_restored} HP.`);
    console.log(`❤️  Current HP: ${hp}/${max_hp}`);

    messages.push(`🛏️  Rested and restored ${hp_restored} HP.`);
    messages.push(`❤️  Current HP: ${hp}/${max_hp}`);
    messages.push(`⏳ Cooldown started: ${cooldown.total_seconds} seconds`);
    cooldownSeconds = cooldown.total_seconds;
  } catch (error) {
    console.error('❌ ' + error);
    errorMessage = '❌ ' + error;
  }

  return { cooldownSeconds, errorMessage, messages };
};

const gather = async ({
  CHARACTER_NAME,
  headers,
}: ActionProps): Promise<ActionReturn> => {
  const url = `https://api.artifactsmmo.com/my/${CHARACTER_NAME}/action/gathering`;
  const messages: string[] = [];
  let errorMessage = '';
  let cooldownSeconds = 0;

  try {
    const response = await fetch(url, { method: 'POST', headers });
    const data = await response.json();

    if (data.error) throw new Error(data.error.message);

    const { cooldown, details } = data.data;

    const dropsStr = details.items
      .map(i => `${i.quantity}x ${i.code}`)
      .join(', ');

    // TODO: Add XP proper XP type in messages
    console.log(`🪓 Gathered successfully! Gained: ${dropsStr}`);
    console.log(`🌟 ${details.xp} Woodcutting XP gained.`);
    console.log(`⏳ Cooldown started: ${cooldown.total_seconds} seconds`);

    messages.push(`🪓 Gathered successfully! Gained: ${dropsStr}`);
    messages.push(`🌟 ${details.xp} Woodcutting XP gained.`);
    messages.push(`⏳ Cooldown started: ${cooldown.total_seconds} seconds`);
    cooldownSeconds = cooldown.total_seconds;
  } catch (error) {
    console.error('❌ ' + error);
    errorMessage = '❌ ' + error;
  }

  return { errorMessage, cooldownSeconds, messages };
};

interface UnequipProps extends ActionProps {
  slot: string;
}

const unequip = async ({
  CHARACTER_NAME,
  headers,
  slot,
}: UnequipProps): Promise<ActionReturn> => {
  const url = `https://api.artifactsmmo.com/my/${CHARACTER_NAME}/action/unequip`;
  const messages: string[] = [];
  let errorMessage = '';

  // The payload is a list of slots to unequip.
  // "quantity" is optional and only applies to utility slots.
  const body = JSON.stringify([{ slot }]);

  try {
    const response = await fetch(url, { method: 'POST', headers, body });
    const data = await response.json();

    if (data.error) throw new Error(data.error.message);

    console.log(`🎒 Unequipped ${slot}! It is now in your inventory.`);
    console.log(
      `📦 Inventory capacity: ${data.data.character.inventory.length} / ${data.data.character.inventory_max_items}`,
    );

    messages.push(`🎒 Unequipped ${slot}! It is now in your inventory.`);
    messages.push(
      `📦 Inventory capacity: ${data.data.character.inventory.length} / ${data.data.character.inventory_max_items}`,
    );
  } catch (error) {
    console.error('❌ ' + error);
    errorMessage = '❌ ' + error;
  }

  return { errorMessage, messages };
};

interface EquipProps extends ActionProps {
  code: string;
  slot: string;
}

const equip = async ({
  CHARACTER_NAME,
  headers,
  code,
  slot,
}: EquipProps): Promise<ActionReturn> => {
  // Equip the wooden staff from your inventory into the weapon slot
  const url = `https://api.artifactsmmo.com/my/${CHARACTER_NAME}/action/equip`;

  // The payload is a list of items to equip.
  // "quantity" is optional and only applies to utilities.
  const messages: string[] = [];
  let errorMessage = '';
  const body = JSON.stringify([{ code, slot }]);

  try {
    const response = await fetch(url, { method: 'POST', headers, body });
    const data = await response.json();

    if (data.error) throw new Error(data.error.message);

    const char = data.data.character;
    console.log(`✅ Equipped wooden_staff in weapon slot!`);
    console.log(`⚔️  Your earth attack is now ${char.attack_earth}`);

    messages.push(`🎒 Unequipped ${slot}! It is now in your inventory.`);
    messages.push(
      `📦 Inventory capacity: ${data.data.character.inventory.length} / ${data.data.character.inventory_max_items}`,
    );
  } catch (error) {
    console.error('❌ ' + error);
    errorMessage = '❌ ' + error;
  }

  return { errorMessage, messages };
};

interface CraftProps extends ActionProps {
  code: string;
}

const craft = async ({
  CHARACTER_NAME,
  headers,
  code,
}: CraftProps): Promise<ActionReturn> => {
  const url = `https://api.artifactsmmo.com/my/${CHARACTER_NAME}/action/crafting`;
  const messages: string[] = [];
  let errorMessage = '';

  // "code" is the item identifier you want to craft
  const body = JSON.stringify({ code });

  try {
    const response = await fetch(url, { method: 'POST', headers, body });
    const data = await response.json();

    if (data.error) throw new Error(data.error.message);

    const { details } = data.data;
    console.log(`🔨 Crafted 1x wooden_staff successfully!`);
    console.log(`🌟 ${details.xp} Weaponcrafting XP gained.`);

    messages.push(`🔨 Crafted 1x wooden_staff successfully!`);
    messages.push(`🌟 ${details.xp} Weaponcrafting XP gained.`);
  } catch (error) {
    console.error('❌ ' + error);
    errorMessage = '❌ ' + error;
  }

  return { errorMessage, messages };
};

export { craft, equip, fight, gather, move, rest, unequip };
