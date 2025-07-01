import fs from 'fs/promises';
import path from 'path';

// lstat is used because this is also used to check if a symlink file exists
export const fileExists = (filePath: string) =>
	fs.lstat(filePath).then(
		() => true,
		() => false
	);

export const getAiCommitConvention = async (gitRepoPath: string) => {
	const conventionPath = path.join(gitRepoPath, '.aicommitconvention');

	if (!(await fileExists(conventionPath))) {
		return null;
	}

	const convention = await fs.readFile(conventionPath, 'utf8');
	return convention;
};
