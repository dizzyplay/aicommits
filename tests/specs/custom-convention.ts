import { testSuite, expect } from 'manten';
import { createFixture } from '../utils.js';
import { generatePrompt } from '../../src/utils/prompt.js';
import fs from 'fs/promises';
import path from 'path';

export default testSuite(({ describe }) => {
	describe('Custom Conventional Commits', ({ test }) => {
		test('Should use custom conventional commit types from .aicommitconvention file', async () => {
			const { fixture } = await createFixture();
			const conventionPath = path.join(fixture.path, '.aicommitconvention');

			await fs.writeFile(conventionPath, JSON.stringify({
				"custom": "A custom commit type"
			}));

			const prompt = await generatePrompt('en', 50, 'conventional', fixture.path);

			expect(prompt).toContain('A custom commit type');

			await fixture.rm();
		});
	});
});