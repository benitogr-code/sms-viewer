import parseXml from '@rgrove/parse-xml';
import { XmlElement } from '@rgrove/parse-xml/dist/types/lib/XmlNode';
import { Conversation } from '../model/conversation';

export function importSmsBackup(xmlData: string): Conversation[]|null {
  try {
    const conversations: Map<string, Conversation> = new Map();

    const xmlDoc = parseXml(xmlData);
    const xmlElements = (xmlDoc.children[0] as XmlElement)?.children ?? [];

    xmlElements.forEach((value: XmlElement, index) => {
      if (value.name !== 'sms')
        return;

      const element = {
        phone: value.attributes['address'] ?? '',
        name: value.attributes['contact_name'] ?? '',
        timestamp: Number.parseInt(value.attributes['date'] ?? '0'),
        outbound: value.attributes['type'] === '2',
        body: value.attributes['body'] ?? '',
      };

      if (!element.phone)
        return;

      if (!conversations.has(element.phone)) {
        conversations.set(element.phone, {
          phone: element.phone,
          name: element.name,
          messages: [],
        });
      }

      conversations.get(element.phone).messages.push({
        body: element.body,
        outbound: element.outbound,
        time: element.timestamp,
        readableTime: new Date(element.timestamp).toLocaleString(),
      });
    });

    return Array.from(conversations).map(([key, value]) => (value));
  }
  catch (error) {
    console.error('[importSmsBackup]', error.message);
    return null;
  }
}
