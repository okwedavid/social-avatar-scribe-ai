
import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Environment, Sky } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

// Placeholder Character Model Component
const CharacterModel = ({ customization }: { customization: any }) => {
  // This would ideally load a real 3D model
  // For now we're using a placeholder cube
  return (
    <group position={[0, 0, 0]}>
      <mesh>
        <boxGeometry args={[1, 1.8, 0.6]} />
        <meshStandardMaterial 
          color={customization.skinColor || '#e0ac69'} 
        />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color={customization.skinColor || '#e0ac69'} 
        />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.2, 1.1, 0.35]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.2, 1.1, 0.35]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Pupils */}
      <mesh position={[0.2, 1.1, 0.42]}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial color={customization.eyeColor || '#6b3e26'} />
      </mesh>
      <mesh position={[-0.2, 1.1, 0.42]}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial color={customization.eyeColor || '#6b3e26'} />
      </mesh>
      {/* Hair */}
      {customization.hairStyle === 'short' && (
        <mesh position={[0, 1.4, 0]}>
          <boxGeometry args={[0.9, 0.2, 0.9]} />
          <meshStandardMaterial color={customization.hairColor || '#3b2c1d'} />
        </mesh>
      )}
      {customization.hairStyle === 'long' && (
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[0.9, 1.2, 0.8]} />
          <meshStandardMaterial color={customization.hairColor || '#3b2c1d'} />
        </mesh>
      )}
      {/* Clothing */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[1.1, 1, 0.7]} />
        <meshStandardMaterial color={customization.clothingColor || '#3944bc'} />
      </mesh>
    </group>
  );
};

const CharacterCreator = () => {
  const [customization, setCustomization] = useState({
    hairStyle: 'short',
    hairColor: '#3b2c1d',
    skinColor: '#e0ac69',
    eyeColor: '#6b3e26',
    clothingColor: '#3944bc',
    height: 1,
    bodyType: 'average',
  });

  const [characterName, setCharacterName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const updateCustomization = (key: string, value: any) => {
    setCustomization((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveCharacter = () => {
    if (!characterName) {
      toast.error("Please give your character a name!");
      return;
    }

    setIsSaving(true);
    // Simulate saving character
    setTimeout(() => {
      toast.success(`Character ${characterName} saved successfully!`);
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* 3D Character Preview */}
      <motion.div 
        className="col-span-1 lg:col-span-2 gradient-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="scene-container gradient-border-inner h-[600px]">
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[0, 1, 4]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            <Suspense fallback={null}>
              <CharacterModel customization={customization} />
              <Environment preset="city" />
              <Sky />
            </Suspense>
            <OrbitControls 
              enableZoom={true} 
              enablePan={false} 
              minPolarAngle={0} 
              maxPolarAngle={Math.PI / 2} 
            />
          </Canvas>
        </div>
      </motion.div>

      {/* Customization Controls */}
      <motion.div 
        className="col-span-1 space-y-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div>
          <h2 className="text-2xl font-bold gradient-text">Character Creator</h2>
          <p className="text-muted-foreground">Customize your character's appearance</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="character-name" className="text-sm font-medium">Character Name</label>
            <input
              id="character-name"
              type="text" 
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              placeholder="Enter character name"
            />
          </div>

          <Tabs defaultValue="appearance">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="body">Body</TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance" className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium">Hair Style</label>
                <Select 
                  value={customization.hairStyle} 
                  onValueChange={(value) => updateCustomization('hairStyle', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select hair style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="long">Long</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Hair Color</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={customization.hairColor}
                    onChange={(e) => updateCustomization('hairColor', e.target.value)}
                    className="h-8 w-8 cursor-pointer rounded-full border-none"
                  />
                  <span className="text-xs text-muted-foreground">{customization.hairColor}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Skin Color</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={customization.skinColor}
                    onChange={(e) => updateCustomization('skinColor', e.target.value)}
                    className="h-8 w-8 cursor-pointer rounded-full border-none"
                  />
                  <span className="text-xs text-muted-foreground">{customization.skinColor}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Eye Color</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={customization.eyeColor}
                    onChange={(e) => updateCustomization('eyeColor', e.target.value)}
                    className="h-8 w-8 cursor-pointer rounded-full border-none"
                  />
                  <span className="text-xs text-muted-foreground">{customization.eyeColor}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Clothing Color</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={customization.clothingColor}
                    onChange={(e) => updateCustomization('clothingColor', e.target.value)}
                    className="h-8 w-8 cursor-pointer rounded-full border-none"
                  />
                  <span className="text-xs text-muted-foreground">{customization.clothingColor}</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="body" className="space-y-4 py-4">
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Height</label>
                  <span className="text-xs text-muted-foreground">{Math.round(customization.height * 100)}%</span>
                </div>
                <Slider 
                  value={[customization.height]} 
                  min={0.8}
                  max={1.2} 
                  step={0.01}
                  onValueChange={([value]) => updateCustomization('height', value)}
                  className="py-4"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Body Type</label>
                <Select 
                  value={customization.bodyType} 
                  onValueChange={(value) => updateCustomization('bodyType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slim">Slim</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="muscular">Muscular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Button
          className="w-full" 
          onClick={saveCharacter}
          disabled={isSaving || !characterName}
        >
          {isSaving ? "Saving..." : "Save Character"}
        </Button>
      </motion.div>
    </div>
  );
};

export default CharacterCreator;
