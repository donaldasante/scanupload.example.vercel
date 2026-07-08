import { type NextRequest, NextResponse } from 'next/server';
import { fetchSessionZip, getAccessToken } from '@scanupload/qr-code-generator-nextjs-server';

export const maxDuration = 60;

export async function GET(_req: NextRequest, { params }: { params: Promise<{ sessionId: string }> }): Promise<NextResponse> {
    const { sessionId } = await params;

    if (!sessionId || sessionId.trim() === '') {
        console.warn(`[download-file] missing sessionId`);
        return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    try {
        const { access_token } = await getAccessToken();
        const result = await fetchSessionZip(sessionId, access_token);

        if (result.kind === 'error') {
            console.error(`[download-file] error from fetchSessionZip:`, result);
            return NextResponse.json({ error: result.message }, { status: result.status });
        }

        return new NextResponse(result.buffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': `attachment; filename="${result.fileName}"`
            }
        });
    } catch (err) {
        console.error(`[download-file] error:`, err);
        const message = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json({ error: `Download failed: ${message}` }, { status: 500 });
    }
}
