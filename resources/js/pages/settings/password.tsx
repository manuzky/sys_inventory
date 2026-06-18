import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { type SharedData } from '@/types';
import { useState } from 'react';

import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: '/settings/password',
    },
];

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const { auth } = usePage<SharedData>().props;
    console.log(auth.user);
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        username: auth.user?.username ?? '',
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const changePassword = (e: React.FormEvent) => {
        e.preventDefault();

        passwordForm.put(route('password.change'), {
            preserveScroll: true,

            onSuccess: () => {
                passwordForm.reset();

                setPasswordDialogOpen(false);

                setPasswordChanged(true);

                setTimeout(() => {
                    setPasswordChanged(false);
                }, 1000);

            },
        });
    };

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,

            onSuccess: () => {
                reset('current_password');

                router.reload({
                    only: ['auth'],
                });
            },

            onError: (errors) => {
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Update password" description="Ensure your account is using a long, random password to stay secure" />

                    <form onSubmit={updatePassword} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                                                    <Input
                                id="username"
                                className="mt-1 block w-full"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Username"
                            />
                            <InputError className="mt-2" message={errors.username} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="current_password">Current password</Label>

                            <Input
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                placeholder="Current password"
                                required
                            />

                            <InputError message={errors.current_password} />
                        </div>


                        <div className="flex items-center gap-4">

                            <Button disabled={processing}>Guardar nuevo usuario</Button>

                            <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        Cambiar contraseña
                                    </Button>
                                </DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Cambiar contraseña</DialogTitle>

                                        <DialogDescription>
                                            Introduzca su contraseña actual y la nueva contraseña.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <form onSubmit={changePassword} className="space-y-4">
                                        <div>
                                            <Label>Contraseña actual</Label>

                                            <Input
                                                type="password"
                                                value={passwordForm.data.current_password}
                                                onChange={(e) =>
                                                    passwordForm.setData(
                                                        'current_password',
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={
                                                    passwordForm.errors.current_password
                                                }
                                            />
                                        </div>

                                        <div>
                                            <Label>Nueva contraseña</Label>

                                            <Input
                                                type="password"
                                                value={passwordForm.data.password}
                                                onChange={(e) =>
                                                    passwordForm.setData(
                                                        'password',
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={passwordForm.errors.password}
                                            />
                                        </div>

                                        <div>
                                            <Label>Confirmar contraseña</Label>

                                            <Input
                                                type="password"
                                                value={passwordForm.data.password_confirmation}
                                                onChange={(e) =>
                                                    passwordForm.setData(
                                                        'password_confirmation',
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={
                                                    passwordForm.errors.password_confirmation
                                                }
                                            />
                                        </div>

                                        <Button
                                            type="button"
                                            onClick={changePassword}
                                        >
                                            Guardar contraseña
                                        </Button>
                                    </form>
                                </DialogContent>
                            </Dialog>

                            <>
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-neutral-600">
                                        Username actualizado correctamente
                                    </p>
                                </Transition>

                                <Transition
                                    show={passwordChanged}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-neutral-600">
                                        Contraseña actualizada correctamente
                                    </p>
                                </Transition>
                            </>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
