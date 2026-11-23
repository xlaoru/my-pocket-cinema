import { HttpResourceRef } from '@angular/common/http';

export function resourceStatus(ref: HttpResourceRef<unknown>) {
    return {
        loading: ref.isLoading,
        error: ref.error,
        reload: () => ref.reload(),
    }
}