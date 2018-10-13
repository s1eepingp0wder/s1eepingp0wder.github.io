local Assets =
{
	Asset("ANIM", "anim/poutine.zip"),
    Asset("ATLAS", "images/inventoryimages/poutine.xml"),
}

local prefabs = 
{
	"spoiled_food",
}

local function doareasleep(inst, range, time)
    local x, y, z = inst.Transform:GetWorldPosition()
    local ents = TheSim:FindEntities(x, y, z, range)
    for i, v in ipairs(ents) do
        if not (v.components.freezable ~= nil and v.components.freezable:IsFrozen()) and
            not (v.components.pinnable ~= nil and v.components.pinnable:IsStuck()) then
            if v:HasTag("player") then
                v:PushEvent("yawn", { grogginess = 3, knockoutduration = time + math.random() })
            elseif v.components.sleeper ~= nil then
                v.components.sleeper:AddSleepiness(3, time + math.random())
            elseif v.components.grogginess ~= nil then
                v.components.grogginess:AddGrogginess(3, time + math.random())
            else
                v:PushEvent("knockedout")
            end
        end
    end
end

local function oneaten(inst, eater)
    eater:DoTaskInTime(0.5, function() 
        doareasleep(eater, .05, TUNING.MANDRAKE_SLEEP_TIME)
    end)
end


local function fn(Sim)
	local inst = CreateEntity()
	inst.entity:AddTransform()
	inst.entity:AddAnimState()
	if TheSim:GetGameID() =="DST" then inst.entity:AddNetwork() end

	MakeInventoryPhysics(inst)
	MakeSmallBurnable(inst)
	MakeSmallPropagator(inst)
	
	inst.AnimState:SetBank("poutine")
	inst.AnimState:SetBuild("poutine")
	inst.AnimState:PlayAnimation("idle", false)
	
	inst:AddTag("preparedfood")
    
	if TheSim:GetGameID()=="DST" then
		if not TheWorld.ismastersim then
			return inst
		end
		
		inst.entity:SetPristine()
	end

	inst:AddComponent("edible")
	inst.components.edible.healthvalue = 0
	inst.components.edible.hungervalue = TUNING.CALORIES_HUGE
	inst.components.edible.sanityvalue = 10
	inst.components.edible.temperaturedelta = TUNING.HOT_FOOD_BONUS_TEMP / 2
	inst.components.edible.temperatureduration = TUNING.FOOD_TEMP_LONG * 2
    inst.components.edible:SetOnEatenFn(oneaten)
	
	--[[		temperature = TUNING.HOT_FOOD_BONUS_TEMP,
				temperatureduration = TUNING.FOOD_TEMP_LONG,]]--
	
	inst:AddComponent("inspectable")

	inst:AddComponent("inventoryitem")
	inst.components.inventoryitem.atlasname = "images/inventoryimages/poutine.xml"

	inst:AddComponent("stackable")
	inst.components.stackable.maxsize = TUNING.STACK_SIZE_SMALLITEM

	inst:AddComponent("perishable")
	inst.components.perishable:SetPerishTime(TUNING.PERISH_PRESERVED)
	inst.components.perishable:StartPerishing()
	inst.components.perishable.onperishreplacement = "spoiled_food"
		
	return inst
end

STRINGS.NAMES.POUTINE = "Poutine"

[[STRINGS.CHARACTERS.GENERIC.DESCRIBE.POUTINE = {
	"A hearty, heart stopping meal!",
	"It's very warm.",
	
}
STRINGS.CHARACTERS.WENDY.DESCRIBE.POUTINE = {
	"It will stop my heart quicker.",
	"An alternative to the rope.",
	
}]]
return Prefab( "common/inventory/poutine", fn, Assets )